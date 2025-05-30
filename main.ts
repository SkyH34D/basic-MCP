import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CompatibilityCallToolResultSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from 'zod'

// 1. Create the server
// This is the main interface with the MCP protocol. It handles communication between the client and the server.
const server = new McpServer ({
    name: 'basic-mcp',
    version: '1.0.0'
})

// 2. Define the tools
// Tools allow the LLM to perform actions through your server.
server.tool(
    'fetch-weather', //tool title
    'Tool to fetch the weather of a city', //tool description
    {
        city: z.string().describe('City name'), //tool input params
    },
    async ({ city }) => {
        //what we want it to do
        return {
            content: [
                {
                type: 'text',
                text: `The weather in ${city} is sunny.`
                }
            ]
        }
    }
)

// 3. Listen for client connections
// The transport is the communication channel between the client and the server. In this case, standard input/output is used.
const transport = new StdioServerTransport ()
await server.connect(transport)
