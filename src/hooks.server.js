import PocketBase from "pocketbase"
import { serializedNonPOJOs } from "$lib/utlis"

export const handle = async ({event, resolve}) =>{
    event.locals.pb = new PocketBase('http://127.0.0.1:8090')
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    if(event.locals.pb.authStore.isValid){
        event.locals.users = serializedNonPOJOs(events.locals.pb.authStore.model)
    } else {
        event.locals.users = undefined
    }

    const response = await resolve(event)

    Response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({secure: false}))

    return response
}