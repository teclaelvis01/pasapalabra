
export function convertSnaps<T>(results: any) {
    return <T[]>results.docs.map((snap: any) => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })

}
export function convertSnapsValue<T>(results: any) {
    return <T[]>results.map((snap: any) => {
        return {
            id: snap.id,
            ...<any>snap
        }
    })

}
export function convertSnapsValueObject<T>(object: any) {
    let data = [];

    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key];
            data.push(element)
        }
    }
    data = data.sort((a,b)=>a.position - b.position)
    return <T[]>data;

}
export function convertSnap<T>(result: any) {
    return <T>result.data();

}