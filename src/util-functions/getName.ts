function getName(email: string) {
    const splitEmail: string[] = email.split("");

    for (let i = 0; i < splitEmail.length; i++) {
        if (splitEmail[i] === ".") {
            splitEmail[i] = " ";
        }
        if (splitEmail[i] === "@") {
            return splitEmail.slice(0, i).join("");
        }
    }
}

export default getName;
