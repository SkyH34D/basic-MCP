import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CompatibilityCallToolResultSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from 'zod'

// 1. Crear el servidor
// Es la interfaz principal con el protocolo MCP. Maneja la comunicación entre el cliente y el servidor

const server = new McpServer ({
    name: 'first-mcp',
    version: '1.0.0'
})

// 2. Definir las herramientas
// Las herramientas le permite al LLM realizar acciones a través de tu servidor.
server.tool(
    'fetch-weather', //titulo de la herramienta
    'Tool to fetch the weather of a city', //descripción de la herramienta
    {
        city: z.string().describe('City name'), // parametros que puede recibir la herramienta
    },
    async ({ city }) => {
        // lo que queremos que haga
        return {
            content: [
                {
                type: 'text',
                text: `El clima de ${city} es soleado`
                }
            ]
        }
    }
)

// 3. Escuchas las conexiones del cliente
//El transporte es el medio de comunicación entre el cliente y el servidor. En este caso, se utiliza la entrada/salida estándar
const transport = new StdioServerTransport ()
await server.connect(transport)
