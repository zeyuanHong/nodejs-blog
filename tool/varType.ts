export interface Users {
    id?: number
    email?: string
    password?: string
    nick?: string
    avatar?: string
    score?: number
    introduction?: number
}

export interface Blog {
    id: number
    uid: number
    title: string
    introduction: string
    img: string
    content: string
    blog_type: string
    read_: number
    create_time: string
}

export interface Article {
    id: number
    uid: string
    blog_id: number
    content: string
    create_time: string
}