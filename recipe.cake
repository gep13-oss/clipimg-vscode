#load "nuget:https://www.nuget.org/api/v2?package=Cake.VsCode.Recipe&version=1.0.0"

if(BuildSystem.IsLocalBuild)
{
    Environment.SetVariableNames(
        githubTokenVariable: "CLIPIMGVSCODE_GITHUB_TOKEN"
    );
}
else
{
    Environment.SetVariableNames();
}

BuildParameters.SetParameters(context: Context,
                            buildSystem: BuildSystem,
                            title: "clipimg-vscode",
                            repositoryOwner: "gep13-oss",
                            repositoryName: "clipimg-vscode",
                            appVeyorAccountName: "gep13oss",
                            shouldRunGitVersion: true,
                            shouldDownloadMilestoneReleaseNotes: true,
                            vsceVersionNumber:"2.15.0",
                            typeScriptVersionNumber: "5.7.3",
                            preferDotNetGlobalToolUsage: true,
                            marketPlacePublisher: "gep13");

BuildParameters.PrintParameters(context: Context);

ToolSettings.SetToolSettings(context: Context);

Build.Run();
