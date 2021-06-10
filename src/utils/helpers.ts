
export default {
    reduceText
}

function reduceText(text: string, length: number) {
    
    return text.slice(0, length) + (text.length > length ? '...' : '')
}