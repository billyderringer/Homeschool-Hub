import constants from './constants'

const actions = {

    //term actions
    setTerms:(terms) => {
        return {type: constants.SET_TERMS, terms}
    }
}

export default actions