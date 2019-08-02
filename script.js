const root = document.querySelector('#root');


class App extends React.Component{
    constructor(){
        super()
        const users = []
        while(users.length < 10){
            users.push(faker.helpers.createCard())
        }
        this.state = {users}
    }
    render(){
        const { users } = this.state;
        const createUser = () => {
            console.log('createUser');
            const newUser = faker.helpers.createCard();
            users.push({...newUser, isFavorite: true});
            this.setState({users})
        }
        const toggleUser = (idx) => {
            console.log('toggle user');
            users[idx].isFavorite = !users[idx].isFavorite;
            this.setState({users});
        }

        const lis = users.map( (user,idx) => {
            const userCards = [user.name, user.username].map((item, idx) => React.createElement('div', {key: idx}, item))
            return React.createElement('li', {onClick: () => {toggleUser(idx)}, key: idx, className: user.isFavorite ? 'Favorite' : ''}, userCards) 
        } )
        const favNum = users.filter( user => user.isFavorite ).length
        const userList = React.createElement('ul', null, lis);
        const subtitle = React.createElement('h2', {onClick: createUser}, `you have ${favNum} favorites`);
        return (
            React.createElement('div', null, subtitle, userList)
        )
    }
}



ReactDOM.render(React.createElement(App), root)