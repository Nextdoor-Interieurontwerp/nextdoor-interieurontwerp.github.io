import { renderLlmsIndex } from '../utils/llms'

export default defineEventHandler(async (event) => {
    setHeader(event, 'content-type', 'text/plain; charset=utf-8')
    return await renderLlmsIndex(event)
})
