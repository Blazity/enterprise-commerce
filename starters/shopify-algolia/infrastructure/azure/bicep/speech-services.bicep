param speechServicesName string = 'ecom-speechServices-${uniqueString(resourceGroup().id)}'
param location string = resourceGroup().location
param sku string = 'S0'

param tags object = {
  environment: 'production'
  application: 'ecommerce-voice-search'
}

// Base Speech Services resource
resource account 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: speechServicesName
  location: location
  kind: 'SpeechServices'
  sku: {
    name: sku
  }
  tags: tags
  properties: {}
}


