declare module '*.json' {
    const value: {
        description: string
        manifest: string
        rel: string
        icons: {
            size: number
            name: string
            description: string
        }
    }
    export default value
}
