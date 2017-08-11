export type Icon = {
    size: number | string
    name: string
    description: string
    mime?: string
}

export interface Configuration {
    description: string
    manifest: string
    rel: string
    icons: Icon[]
}
