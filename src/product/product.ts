export class ProductClass {
    async getClient(idClie: string):Promise<object>{
        const arrayClientes = [
            {id: '1',name: 'Jesica'}, 
            {id: '2',name: 'Daniel'},
            {id: '3',name: 'Victor'},
        ]
        const clieFound = arrayClientes.find(element => element.id = idClie);
        return clieFound
    }

    async getProduct(idProd: string): Promise<object>{
        const arrayProd = [
            {id: '1',name: 'Jesica'}, 
            {id: '2',name: 'Daniel'},
            {id: '3',name: 'Victor'},
        ]
        const prodFound = arrayProd.find(element => element.id = idProd);
        return prodFound
    }

    async getStatus(idProduct: string): Promise<object>{
        const arrayProducts = [
            {id: '1',name: 'Orden 1', status: 'E'}, 
            {id: '2',name: 'Orden 2', status: 'P'}, 
            {id: '3',name: 'Orden 3', status: 'F'},
        ];
        const statusFound = arrayProducts.find(element => element.id == idProduct && element.status == 'F');
        console.log(statusFound)
        return statusFound
    }
}
