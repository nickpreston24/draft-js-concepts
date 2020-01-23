import React from 'react'
import { Elite } from './RichEditor'

// IOC attempt
export default Elite =>
    (props) => {
        console.log('What is elite? ', Elite);
        console.log('super props', props);

        const { name, soups, clothes } = props;
        console.log('the store: ', name, soups, clothes);

        return (
            <div>

                <Elite />
                <i>Slightly better than a boring old Elite Editor!</i>
                <br />
                <button>X</button>
                <button>Y</button>
            </div>
        )
    }