To add localhost.crt to the Trusted Root Certification Authorities store on Windows start "Microsoft Management Console"(<Windows Key> + R and type mmc. Then go to "File > Add/Remove Snap-in…" and select "Certificates" for the current user. Right-click on "Certificates" under "Trusted Root Certification Authorities" and select "All Tasks > Import…".

To regenerate (not necessary, just for documentation)
openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout localhost.key -days 36500 -out localhost.crt -config certificate.cnf



