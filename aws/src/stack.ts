import * as path from 'path'

import {Construct} from 'constructs'
import {Stack, StackProps} from 'aws-cdk-lib'
import {Function, Code, Runtime} from 'aws-cdk-lib/aws-lambda'
import {RestApi, LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import { HttpMethod } from 'aws-cdk-lib/aws-stepfunctions-tasks'


export default class LambdaApiGatewayStack extends Stack {
  private api = new RestApi(this, 'api')

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    const testLambdaFunc = new Function(this, 'test-lambda', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      functionName: "test-lambda",
      code: Code.fromAsset(path.join(__dirname, '../../functions/test'))
    })

    const testFuncApiLambdaIntegration = new LambdaIntegration(testLambdaFunc)
    const apiResource = this.api.root.addResource('test')
    apiResource.addMethod(HttpMethod.GET, testFuncApiLambdaIntegration)
  }
}