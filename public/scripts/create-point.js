
function populateUFs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
       
        for( const state of states){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()


function getCities(event){
    
    const citySelect = document.querySelector("select[name=city]")

    const stateInput = document.querySelector("[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufvalue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        
       
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })


}






document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = [] 


function handleSelectedItem(event){
    const itemLi = event.target

    // Adicionar ou remover uma class com JS
    itemLi.classList.toggle("selected")


    const itemId = itemLi.dataset.id
    

    // verificar se ha items selecionados , se sim
    // pegar os items que estao

    const alreadySelected =  selectedItems.findIndex( item => {
        const itemFound =  item == itemId

        return itemFound
    })
    
    // se ja estiver selecionado 

    if( alreadySelected >=0 ){
        // tirar

        const filteredItems = selectedItems.filter( item => {

            const itemIsDifferent  = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
        

    }
    else{
        // se nao estiver adicionar a selecao
        selectedItems.push(itemId)
    }

    
    collectedItems.value = selectedItems

}

