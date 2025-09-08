# Subgraph para el Token LINK (ERC-20)

![The Graph](https://img.shields.io/badge/The%20Graph-6c48e2?style=for-the-badge&logo=thegraph&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)

Este repositorio contiene el código fuente para un subgraph de The Graph diseñado para indexar los eventos de transferencia del contrato del token Chainlink (LINK) en la red de prueba **Sepolia**.

Este proyecto fue desarrollado como parte de la Diplomatura en Blockchain de la UTN.

## Propósito del Subgraph

El objetivo de este subgraph es proporcionar una API de GraphQL para consultar de manera eficiente el historial de transferencias y los balances de las cuentas del token LINK. Esto permite a las aplicaciones descentralizadas (dApps) acceder a esta información sin necesidad de consultar directamente la blockchain, lo cual sería lento e ineficiente.

## Schema de Datos (`schema.graphql`)

El subgraph define dos entidades principales:

* **`Account`**: Representa una dirección de Ethereum que ha interactuado con el token.
    * `id`: Dirección de la cuenta.
    * `balance`: El balance actual de tokens LINK de la cuenta.
* **`Transfer`**: Representa un evento `Transfer` del contrato ERC-20.
    * `id`: El hash de la transacción.
    * `from`: La cuenta que envía los tokens.
    * `to`: La dirección que recibe los tokens.
    * `value`: La cantidad de tokens transferida.

## Cómo Empezar

Para desplegar o probar este subgraph, necesitas tener instalado el **Graph CLI**.

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/subgraph-link-token.git](https://github.com/tu-usuario/subgraph-link-token.git)
    cd subgraph-link-token
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Generar código y compilar:**
    ```bash
    graph codegen
    graph build
    ```

4.  **Desplegar:**
    Sigue los pasos en The Graph Studio para crear un nuevo subgraph, obtener una clave de despliegue y ejecutar el comando de despliegue.

## Ejemplo de Consulta

Una vez que el subgraph esté desplegado y sincronizado, puedes ejecutar consultas como la siguiente en el Playground para obtener las últimas 5 transferencias:

```graphql
query MisPrimerasTransferencias {
  transfers(first: 5, orderBy: timestamp, orderDirection: desc) {
    id
    from {
      id
      balance
    }
    to
    value
    timestamp
  }
}
