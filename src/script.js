const user = document.getElementById("user")
const card = document.getElementById("cartao")
const add = document.getElementById("adicionar")
const bg = document.getElementById("plano_fundo")
const profile = document.getElementById("perfil")
const name_user = document.getElementById("nome_user")
const email = document.getElementById("email_user")
const list_repo = document.getElementById("repo_list")

add.addEventListener("click", async () => {
    try {
        const response = await axios.get(`https://api.github.com/users/${user.value}`)
        let info = response.data
        let name_git = info.name
        let email_git = info.email
        let new_profile = info.avatar_url
        name_user.textContent = name_git
        email.textContent = email_git
        profile.src = new_profile
        const repository = await axios.get(`https://api.github.com/users/${user.value}/repos`)
        let repo = repository.data 
        list_repo.innerHTML = ""
        repo.forEach(rep => {
            const li = document.createElement("li")
            li.style.listStyle = "none"
            li.textContent = rep.name
            list_repo.appendChild(li)
        })
        user.value = ""
    } catch (error) {
        console.error("Perfil não encontrado:", error)
    }
})