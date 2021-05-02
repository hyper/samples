package main

import (
    "bytes"
    "fmt"
    "io/ioutil"
    "net/http"
)

func getLicense(apikey string, license string) string {
    req, err := http.NewRequest("GET", fmt.Sprintf("https://api.metalabs.io/v4/licenses/%s", license), nil)
    if err != nil {
        log.Fatal(err)
    }

    req.Header.Set("Authorization", "Bearer "+apikey)
    client := &http.Client{}
    resp, err := client.Do(req)

    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode == 200 {
        body, err := ioutil.ReadAll(resp.Body)

        if err != nil {
            log.Fatal(err)
            }

        return string(body)
    }

    return "Not Found"
}