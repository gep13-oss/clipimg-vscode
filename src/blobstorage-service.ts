import * as vscode from 'vscode';
import { injectable, inject } from 'inversify';
import TYPES from './types';
import { MessageService } from './message-service';
import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, ContainerSASPermissions } from '@azure/storage-blob';
import { setPassword, getPassword } from 'keytar';
import { error } from 'console';
import { TemplateService } from './template-service';

@injectable()
export class BlobStorageService {
  constructor(
        @inject(TYPES.MessageService) private messageService: MessageService,
        @inject(TYPES.TemplateService) private templateService: TemplateService
      ){ }

  async uploadStorageBlockBlob(imageFileName: string,
        imageFullFileName: string) {
    let config = vscode.workspace.getConfiguration('clipImg');

    let { blobServiceClient, storageSharedKeyCredential } = await this.getBlobServiceClient(config);

    let container = blobServiceClient.getContainerClient(config.get('storageAccountContainer', 'clipimg-vscode'));
    await container.createIfNotExists();

    let blobName = await this.templateService.parseAndRender('templateBlobName',
      {
        filename: imageFileName
      });

    let blobClient = container.getBlockBlobClient(blobName);

    await blobClient.uploadFile(imageFullFileName, { blobHTTPHeaders: { blobContentType: 'image/png' } });
    let startsOn = new Date();
    let expiresOn = new Date();
    startsOn.setDate(startsOn.getDate() - 1);
    expiresOn.setFullYear(expiresOn.getFullYear() + 10);

    let sasQuery = generateBlobSASQueryParameters(
      {
        containerName: container.containerName,
        blobName: blobName,
        permissions: ContainerSASPermissions.parse('r'),
        startsOn: startsOn,
        expiresOn: expiresOn
      },
      storageSharedKeyCredential
    );

    let blobUri = await this.templateService.parseAndRender(
      'templateBlobUri',
      {
        container: container.containerName,
        blob: blobName,
        uri: decodeURIComponent(blobClient.url),
        sas: sasQuery,
        filename: imageFileName
      }
    );

    return blobUri;
  }

  private async getBlobServiceClient(config: vscode.WorkspaceConfiguration) {
    let { storageAccountName, storageAccountKey, storageAccountUrl } = await this.getStorageAccount(config);

    let storageSharedKeyCredential = new StorageSharedKeyCredential(storageAccountName,
      storageAccountKey
    );

    let blobServiceClient = new BlobServiceClient(
      storageAccountUrl,
      storageSharedKeyCredential
    );
    return { blobServiceClient, storageSharedKeyCredential };
  }

  private async getStorageAccount(config: vscode.WorkspaceConfiguration) {
    let storageAccountName = await this.getStorageAccountName(config);
    let storageAccountUrl = `https://${storageAccountName}.blob.core.windows.net`;
    let storageAccountKey = await this.getStorageAccountKey(storageAccountUrl, storageAccountName);
    return { storageAccountName, storageAccountKey, storageAccountUrl };
  }

  private async getStorageAccountKey(storageAccountUrl: string, storageAccountName: string) {
    let storageAccountKey = (await getPassword(storageAccountUrl, storageAccountName)) || '';

    if (storageAccountKey.length <= 0) {
      storageAccountKey = await this.messageService.showInput('Provide storage account key', '', true) || '';

      if (storageAccountKey.length <= 0) {
        throw new Error('Failed to fetch storage account key.');
      }
      await setPassword(storageAccountUrl, storageAccountName, storageAccountKey);
    }
    return storageAccountKey;
  }

  private async getStorageAccountName(config: vscode.WorkspaceConfiguration) {
    let storageAccountName = config.get('storageAccountName', '') || '';

    if (storageAccountName.length <= 0) {
      storageAccountName = await this.messageService.showInput('Provide storage account name', '') || '';

      if (storageAccountName.length <= 0) {
        throw error('Failed to fetch storage account name.');
      }

      await config.update('storageAccountName', storageAccountName, vscode.ConfigurationTarget.Workspace);
    }
    return storageAccountName;
  }
}