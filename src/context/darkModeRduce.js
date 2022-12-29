const DarkModeReducer = (state, action) =>{
    switch(action.type){
        case "LIGHT":{
            localStorage.setItem("darkMode", false);
            return{
                darkMode:false,
            };
        }
        case "DARK":{
            localStorage.setItem("darkMode", true);
            return{
                darkMode: true,
            };
        }
        case "TOGGLE":{
            localStorage.setItem("darkMode", !state.darkMode);
            return {
                darkMode: !state.darkMode,
            };
        }
        default:
            return state;
    }
};

export default DarkModeReducer;