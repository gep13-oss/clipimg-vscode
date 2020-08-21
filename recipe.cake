#load "nuget:https://www.nuget.org/api/v2?package=Cake.VsCode.Recipe&version=0.1.0"

if(BuildSystem.IsLocalBuild)
{
    Environment.SetVariableNames(
        githubUserNameVariable: "CLIPIMGVSCODE_GITHUB_USERNAME",
        githubPasswordVariable: "CLIPIMGVSCODE_GITHUB_PASSWORD"
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
                            vsceVersionNumber:"1.78.0",
                            typeScriptVersionNumber: "4.0.2");

BuildParameters.PrintParameters(Context);

Build.Run();
