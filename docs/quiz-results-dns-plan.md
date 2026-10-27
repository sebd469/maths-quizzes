# DNS activation plan — mr-d-maths.com

Prepared on 27 October 2026. **Activation completed:** the teacher saved the
Cloudflare nameservers in Namecheap, Cloudflare confirmed the domain active,
and free Email Routing was enabled. The unused Namecheap MX/SPF records were
replaced with Cloudflare's generated mail records. Both a setup test email and
a real quiz notification were received and confirmed by the teacher.

Cloudflare Free has an active domain configuration with the existing website
DNS records imported. Website A/CNAME records are DNS only, so GitHub Pages
continues to serve the website directly after activation. Bot Preference Sync
was disabled during setup. Domain registration remains with Namecheap.

## Website records checked

| Type | Name | Value | Cloudflare proxy |
|---|---|---|---|
| A | @ | 185.199.108.153 | DNS only |
| A | @ | 185.199.109.153 | DNS only |
| A | @ | 185.199.110.153 | DNS only |
| A | @ | 185.199.111.153 | DNS only |
| CNAME | www | sebd469.github.io | DNS only |

The scan also imported all five existing Namecheap forwarding MX records and
the existing SPF TXT record. The teacher confirmed that they use Gmail rather
than domain email addresses. These six unused mail records were replaced when
Cloudflare Email Routing was enabled. Website A/CNAME records were preserved.

Public DNS checks do not enumerate all possible subdomains/TXT records. If
Namecheap contains additional verification or other custom records, copy those
to Cloudflare before the nameserver switch as well.

## Exact nameserver change

In Namecheap, open Domain List → Manage for `mr-d-maths.com` → Nameservers →
Custom DNS. Replace:

```text
dns1.registrar-servers.com
dns2.registrar-servers.com
```

with the nameservers actually assigned by Cloudflare:

```text
nova.ns.cloudflare.com
weston.ns.cloudflare.com
```

Save the change. Check DNSSEC in Namecheap before switching; an old DS record
must not remain pointing to a prior DNS provider. The public DS lookup returned
no records when checked during setup, but inspect the registrar setting too.

This changes the authoritative DNS provider. It does not transfer domain
registration or website hosting. Existing Namecheap free forwarding stops with
custom nameservers; the teacher has stated no domain email is used.

## Checks after the change

1. Wait for Cloudflare to report the domain Active. Check public NS records.
2. Verify root and www still resolve to GitHub Pages and the live quiz pages
   load over HTTPS with their analytics tags.
3. Enable Email Routing for the domain on the free plan, using the teacher's
   already verified destination. Review the generated MX/SPF/DKIM records;
   replace the unused Namecheap mail records only at this step.
4. Configure the Worker EMAIL binding restricted to the verified destination
   and NOTIFY_FROM using the onboarded domain. Keep address values private.
5. Send a fictional test result, confirm private storage and notification
   delivery, then complete the teacher-reviewed GitHub Pages release.

The Cloudflare **Email Sending** product screen asks for a paid upgrade. Do not
buy it: sends restricted to verified destinations are documented as free via
the Email Routing/Worker binding path. If that path cannot be enabled, stop and
report the exact blocker rather than purchasing a plan.

If activation fails, restore the original Namecheap nameservers while checking
the imported records. Do not change the GitHub Pages CNAME file or repository
publication branch to troubleshoot DNS.
