import React, {Component} from 'react';

class NavComponent extends Component {
    render () {
        return (
            <div class="nav">
                <ul class="nav__list">
                    <li class="nav__list__item"><a href="/register">Sign Up</a></li>
                    <li class="nav__list__item"><a href="#">Login</a></li>
                </ul>
            </div>
        )
    }
}

export default NavComponent;