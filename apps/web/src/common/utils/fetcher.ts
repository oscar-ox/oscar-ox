// fetcher function to be used with swr
export const fetcher = async (url: string) => {
    // delcare the fetcher
    const res = await fetch(url, { credentials: "include" });

    // check the state of the request
    if (!res.ok) {
        // create object with error info in
        const error = {
            info: res,
            status: res.status,
        };

        throw error;
    }

    // return the json always
    return res.json();
};