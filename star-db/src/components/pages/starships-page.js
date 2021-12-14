import React from 'react'
import { StarshipDetails, StarshipList } from '../sw-components'
import Row from '../row'
import { withRouter } from 'react-router-dom'

const StarshipsPage = ({ history, match }) => {
  const { id } = match.params
  return (
    <Row left={<StarshipList onItemSelected={(id) => history.push(id)}/>}
         right={<StarshipDetails itemId={id}/>}/>
  )
}

export default withRouter(StarshipsPage)