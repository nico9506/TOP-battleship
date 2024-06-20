import { sayHelloWorld } from "./home";
import "./style.css";


(function generateWebPage() {
    /**
     * Load the components to create and show the HTML elements
     */

    const body = document.body;

    body.appendChild(sayHelloWorld());
})();