import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

export const SignedOutMenu = ({signIn}) => {
    return (
        <Menu.Item position="right">
        <Button basic inverted content="Login" />
        <Button basic inverted onClick={signIn} content="Register" style={{marginLeft: '0.5em'}} />
      </Menu.Item>
    )
}
