export default function (cli) {
    return {
        list () {
            return cli.get('api/questions/')
        },
        vote (choiceId) {
            return cli.post(`api/choices/${choiceId}/vote/`)
        }
    }
}