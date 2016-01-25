import dnsd from 'dnsd';
import ipTools from 'ip';

const domain = process.env.DOMAIN || 'inventid.me';
const v4 = `.v4.${domain}`;
const v6 = `.v6.${domain}`;
const ipv4 = Boolean(process.env.V4) || true;
const ipv6 = Boolean(process.env.V4) || false;
const port = process.env.PORT || 5353;
const ip = process.env.IP || '0.0.0.0';

const ONE_DAY_IN_SECS = 84600;

dnsd
  .createServer(function (req, res) {
    //console.log(res);
    try {
      const question = req.question[0];
      const hostname = question.name;

      if (!isIpv4(hostname) && !isIpv6(hostname)) {
        console.log(`Could not serve hostname: ${hostname}`);
        return res.end();
      }

      if (ipv4 && isIpv4(hostname)) {
        // Handle ipv4
        const queriedPart = hostname.replace(v4, '');

        const returnIp = queriedPart.replace(/-/g, '.');
        if (!ipTools.isV4Format(returnIp)) {
          console.warn(`Could not successfully parse hostname ${hostname} to ipv4`);
          return res.end();
        }
        res.answer.push({name: hostname, type: 'A', data: returnIp, 'ttl': ONE_DAY_IN_SECS});
      } else if (ipv6 && isIpv6(hostname)) {
        // Handle ipv6
        const queriedPart = hostname.replace(v6, '');
        const returnIp = queriedPart.replace(/-/g, ':');

        if (!ipTools.isV6Format(returnIp)) {
          console.warn(`Could not successfully parse hostname ${hostname} to ipv6`);
          return res.end();
        }
        res.answer.push({name: hostname, type: 'AAAA', data: returnIp, 'ttl': ONE_DAY_IN_SECS});
      }
    } catch (e) {
      console.warn(`An error occurred while replying: ${e}`);
    }
    res.end();
  }).zone(v4, v6)
  .listen(port, ip, function () {
    console.log(`Server running at ${ip}:${port} using domains ${domain}`);
    if (ipv4) console.log(`IPv4 is supported on ${v4}`);
    if (ipv6) console.log(`IPv6 is supported on ${v6}`);
  });

function isIpv4(hostname) {
  return hostname.endsWith(v4);
}

function isIpv6(hostname) {
  return hostname.endsWith(v6);
}