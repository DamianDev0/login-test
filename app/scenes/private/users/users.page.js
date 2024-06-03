export const UsersPage = () => {
    const menssage = 'Hello users'
    const $content = /*html*/`
        <h1>${menssage} </h1>
    `
    const logic = () => {
        console.log(menssage)
    }

    return {
        $content,
        logic
    }


}
