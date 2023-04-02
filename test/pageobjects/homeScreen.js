class HomeScreen{

    get homeIcon(){
        return $('~Home')
    }
    get homeScreen(){
        return $('~Home-screen')
    }
    get Forms_icon(){
        return $('~Forms')
    }
}
module.exports = new HomeScreen();