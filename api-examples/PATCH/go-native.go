package main

import (
    "bytes"
    "fmt"
    "io/ioutil"
    "net/http"
)

func updateLicense(apikey string, license string, hardwareid string) string {
    req, err := http.NewRequest("PATCH", fmt.Sprintf("https://api.metalabs.io/v4/licenses/%s", license), bytes.NewBuffer([]byte(fmt.Sprintf(`{"metadata":{"hwid": "%s"}}`, hardwareid))))
    if err != nil {
        log.Fatal(err)
    }

    req.Header.Set("Authorization", "Bearer "+apikey)
    req.Header.Set("Content-Type", "application/json")
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