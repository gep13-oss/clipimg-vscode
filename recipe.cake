#load "nuget:https://www.nuget.org/api/v2?package=Cake.VsCode.Recipe&version=0.1.0"

Environment.SetVariableNames();

BuildParameters.SetParameters(context: Context,
                            buildSystem: BuildSystem,
                            title: "clipimg-vscode",
                            repositoryOwner: "gep13",
                            repositoryName: "clipimg-vscode",
                            appVeyorAccountName: "gep13",
                            shouldRunGitVersion: true);

BuildParameters.PrintParameters(Context);

Build.Run();