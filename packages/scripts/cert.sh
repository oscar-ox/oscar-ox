#!/bin/bash

sudo mkdir -p /etc/docker/certs.d/registry.k8s1.flat.nathanrignall.uk:5000
sudo cp ca.pem /etc/docker/certs.d/registry.k8s1.flat.nathanrignall.uk:5000/ca.crt