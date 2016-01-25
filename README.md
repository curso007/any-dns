[![inventid logo](https://cdn.inventid.nl/assets/logo-horizontally-ba8ae38ab1f53863fa4e99b977eaa1c7.png)](http://opensource.inventid.nl)

# Any DNS

[![Docker downloads](https://img.shields.io/docker/pulls/inventid/any-dns.svg)](https://registry.hub.docker.com/u/inventid/any-dns/)
[![GitHub license](https://img.shields.io/github/license/inventid/any-dns.svg)](https://github.com/inventid/any-dns/blob/master/LICENSE)

## What is it?

For local development it is sometimes easy to query a local machine using hostnames (to test eg CORS stuff).
While `/etc/hosts` is perfect for this on a desktop, on mobile it becomes more cumbersome.

Therefore we introduce any-dns.
Simply pick any IP, replace either the `:` or the `.` with dashes (`-`), and fire your request to `10-0-0-2.v4.inventid.me`.
This will return the ip address `10.0.0.2`.

IPv6 is also supported by the application, but not enabled (and it seems it's unstable so far).

## Environment variables

You can simply use the Docker container.
To specify some configuration, use environment variables.
The following vars are available:

| Variable | Description | Default
|---|---|---|
| `DOMAIN` | The main domain to serve under. The service will pick `v4.$DOMAIN` and `v6.domain` for ipv4 and ipv6 respectively | `inventid.me` |
| `V4` | Set to `true` or `false` to enable or disable ipv4 resolution | `true` |
| `V6` | Set to `true` or `false` to enable or disable ipv6 resolution | `false` |
| `PORT` | Set to the port number to function under (note that it should externally be accessible under port 53 to allow resolution | `5353` |
| `IP` | The IP address to bind to | `0.0.0.0` (all ips) |

## Contributing

You can use the `Dockerfile` to quickly stage stuff locally (on OSX use `docker-machine`).

If you have additions for the code, please [fork the repo](https://github.com/inventid/any-dns/fork) and open a Pull Request.
