import {App} from 'aws-cdk-lib'
import LambdaApiGatewayStack from './stack'

const app = new App()

new LambdaApiGatewayStack(app, "test-lambda-apigateway", {
    stackName: "lamda-apigateway-stack"
})