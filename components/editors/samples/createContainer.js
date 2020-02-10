import Container from "./Container";
import { Elite } from '../components/editors/RichEditor'
import SuperElite from './editors/SuperElite'

export default () => {
    let c = new Container();

    c.service("Elite", c => Elite)
    c.service("SuperElite", c => SuperElite(c.Elite))

    console.log("IOC Container contents: ", c);
    return c;
};
