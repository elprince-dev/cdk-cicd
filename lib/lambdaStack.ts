import { Stack, StackProps } from "aws-cdk-lib";
import { Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";


interface LambdaStackProps extends StackProps {
    stageName?: string;
}

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        new NodejsFunction(this, 'hello-lambda', {
            runtime: Runtime.NODEJS_22_X,
            code: Code.fromAsset("lambda"),
            handler: "hello.handler",
            environment: {
                STAGE: props.stageName!
            }
        })
    }
}