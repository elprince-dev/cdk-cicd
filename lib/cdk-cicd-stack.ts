import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './pipelineStage';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'SamplePipeline', {
      pipelineName: "SamplePipeline",
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('elprince-dev/cdk-cicd', 'main'),
        commands: [
          'npm ci',
          'npx cdk synth'
        ]
      })
    })
    const testStage = pipeline.addStage(new PipelineStage(this, 'testStage', {
      stageName: 'test',
    }))
    testStage.addPre(new CodeBuildStep('Run Unit Tests', {
      commands: [
        'npm ci',
        'npm test'
      ]
    }))
  }
}
