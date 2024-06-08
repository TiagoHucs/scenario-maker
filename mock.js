
function criaMock(){
    return {
        testTitle: 'Cadastro de frases no sistema X',
        testDescription: 'O sistema permite o cadastramento de frases',
        testRules: [
            {
                ruleTitle: 'Usuario precisa estar logado',
                ruleDecription: 'Para que seja possivel cadastrar uma frase o usuario precisa estar logado',
                ruleScenarios: [
                    {
                        scenarioTitle: 'Cadastrar com usuario logado',
                        scenarioSteps: [
                            {
                                stepType: 'Dado que',
                                stepDescription: 'o usuario esteja logado'
                            },
                            {
                                stepType: 'Quando',
                                stepDescription: 'o usuario cadastrar uma frase'
                            },
                            {
                                stepType: 'Então',
                                stepDescription: 'o sistema retornará a msg de sucesso'
                            }
                        ]
                    },
                    {
                        scenarioTitle: 'Cadastrar sem usuario estar logado',
                        scenarioSteps: [
                            {
                                stepType: 'Dado que',
                                stepDescription: 'o usuario não esteja logado'
                            },
                            {
                                stepType: 'Quando',
                                stepDescription: 'o usuario cadastrar uma frase'
                            },
                            {
                                stepType: 'Então',
                                stepDescription: 'o sistema retornará a msg de erro'
                            }
                        ]
                    }
                ]
            },
            {
                ruleTitle: 'A frase precisa conter 1 a 30 caracteres',
                ruleDecription: 'Para que seja possivel cadastrar uma frase, ela precisa ter entre 1 e 30 caracteres',
                ruleScenarios: [
                    {
                        scenarioTitle: 'Cadastrar uma frase nula',
                        scenarioSteps: [
                            {
                                stepType: 'Dado que',
                                stepDescription: 'o usuario esteja logado'
                            },
                            {
                                stepType: 'Quando',
                                stepDescription: 'o usuario cadastrar uma frase nula'
                            },
                            {
                                stepType: 'Então',
                                stepDescription: 'o sistema retornará a msg de erro'
                            }
                        ]
                    },
                    {
                        scenarioTitle: 'Cadastrar uma frase vazia',
                        scenarioSteps: [
                            {
                                stepType: 'Dado que',
                                stepDescription: 'o usuario esteja logado'
                            },
                            {
                                stepType: 'Quando',
                                stepDescription: 'o usuario cadastrar uma frase vazia'
                            },
                            {
                                stepType: 'Então',
                                stepDescription: 'o sistema retornará a msg de erro'
                            }
                        ]
                    },
                    {
                        scenarioTitle: 'Cadastrar uma frase com mais de 30 caracteres',
                        scenarioSteps: [
                            {
                                stepType: 'Dado que',
                                stepDescription: 'o usuario esteja logado'
                            },
                            {
                                stepType: 'Quando',
                                stepDescription: 'o usuario cadastrar uma frase com mais de 30 caracteres'
                            },
                            {
                                stepType: 'Então',
                                stepDescription: 'o sistema retornará a msg de erro'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}