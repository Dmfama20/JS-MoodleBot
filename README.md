# JavaScript-basierter MoodleBot

Dieses Repository bietet die nötigen Komponenten, um einen OpenAI Assistant in Moodle-Freitextfragen zu integrieren. Es enthält ein JavaScript-Skript zur Verwendung innerhalb von Moodle sowie eine Docker-Konfiguration für einen Proxy, um CORS-Fehler zu vermeiden.

## Inhaltsverzeichnis

1. [Projektbeschreibung](#projektbeschreibung)
2. [Verwendung](#verwendung)
   - [JavaScript-Skript](#javascript-skript)
   - [Docker-Proxy](#docker-proxy)
3. [Voraussetzungen](#voraussetzungen)
4. [Traefik Hinweis](#traefik-hinweis)


## Projektbeschreibung

Das Ziel dieses Projekts ist es, eine Möglichkeit zu bieten, in Moodle-Freitextfragen auf einfache Weise einen OpenAI Assistant zu verwenden. Der Assistant kann per Sprache befragt werden und die Antwort direkt in die Moodle-Freitextfrage übertragen. Dafür gibt es zwei wichtige Komponenten:

1. Ein JavaScript, das in Moodle integriert werden kann.
2. Eine Docker-Umgebung für einen Proxy, die dafür sorgt, dass keine Cross-Origin Resource Sharing (CORS) Fehler auftreten, wenn das JavaScript mit dem OpenAI-Server kommuniziert.

## Verwendung

### JavaScript-Skript

Das JavaScript-Skript ist so konzipiert, dass es innerhalb von Moodle-Freitextfragen eingebaut werden kann. Es ermöglicht den Nutzern, mit einem vordefinierten OpenAI Assistant zu interagieren und die erhaltenen Antworten direkt in das Freitextfeld zu übertragen. Dadurch wird die Nutzung von KI-Unterstützung direkt im Moodle-System erleichtert.

### Docker-Proxy

Um CORS-Probleme zu vermeiden, wird ein Docker-basierter Proxy verwendet, der die Anfragen zwischen dem JavaScript in Moodle und den OpenAI-Servern weiterleitet. Dies ist notwendig, da der Browser normalerweise CORS-Anfragen blockieren würde.

## Voraussetzungen

- Docker und Docker Compose sollten auf dem System installiert sein.
- Traefik als Reverse Proxy muss eingerichtet sein. (Siehe [Traefik Webseite](https://traefik.io/)).


Die Docker-Umgebung enthält sowohl die `docker-compose.yml` als auch ein `Dockerfile`, die für den Proxy-Server benötigt werden. Der Proxy hilft dabei, Anfragen des JavaScript-Skripts so weiterzuleiten, dass keine CORS-Fehler auftreten. Bitte konfigurieren Sie vor der Benutzung alle nötigen Dateien entsprechend Ihrer Bedürfnisse (URL des Docker Containers, OpenAI-API-Key, Assistant-ID und URL des entsprechenden Moodle-Systems.)

## Traefik Hinweis

Für die korrekte Funktionalität des Proxy-Containers wird Traefik als Reverse Proxy benötigt. Traefik hilft dabei, den HTTP-Verkehr zu managen und weiterzuleiten. Weitere Informationen zu Traefik findest du hier: [Traefik Webseite](https://traefik.io/).

Stelle sicher, dass Traefik korrekt konfiguriert ist, um Anfragen an den Proxy weiterzuleiten. Es wird empfohlen, die Traefik-Dokumentation durchzusehen, um das Setup korrekt zu konfigurieren.


