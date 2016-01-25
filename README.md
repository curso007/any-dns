# Any DNS

[![Docker downloads](https://img.shields.io/docker/pulls/inventid/any-dns.svg)](https://registry.hub.docker.com/u/inventid/any-dns/)
[![GitHub license](https://img.shields.io/github/license/inventid/any-dns.svg)](https://github.com/inventid/any-dns/blob/master/LICENSE)

## What is it?

For local development it is sometimes easy to query a local machine using hostnames (to test eg CORS stuff).
While `/etc/hosts` is perfect for this on a desktop, on mobile it becomes more cumbersome.

Therefore we introduce any-dns.
Simply pick any IP, replace either the `:` or the `.` with dashes (`-`), and fire your request to `10-0-0-2.v4.inventid.me`.
This will return the ip address `10.0.0.2`.

IPv6 is also supported by the application, but not publicly enabled.

## Contributing

You can use the `Dockerfile` to quickly stage stuff locally (on OSX use `docker-machine`).

If you have additions for the code, please [fork the repo](https://github.com/inventid/any-dns/fork) and open a Pull Request.