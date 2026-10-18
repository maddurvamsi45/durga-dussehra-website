# Jai Maa Durga — Dussehra Devotional Website

A responsive React + Vite website with a traditional maroon, gold, and cream theme. It includes blessings, inspirational quotes, a nine-day Navratri guide, a filterable image gallery, an image lightbox, and a client-side contact-form demo. The project includes Docker, Nginx, Compose, Jenkins, GitHub Actions, and Kubernetes manifests.

## Project structure

```text
durga-dussehra-website/
├── .github/workflows/ci.yml
├── .github/workflows/docker-publish.yml
├── docker/nginx.conf
├── k8s/namespace.yaml
├── k8s/deployment.yaml
├── k8s/service.yaml
├── k8s/ingress.example.yaml
├── k8s/hpa.example.yaml
├── src/components/ (components are composed in App.jsx)
├── src/App.jsx
├── src/data.js
├── src/main.jsx
├── src/styles.css
├── tests/data.test.js
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
└── package.json
```

## Local development

Requirements: Node.js 22+, npm. Run:

```bash
npm install
npm run dev
```

Open http://localhost:5173. For production build and tests:

```bash
npm test
npm run build
npm run preview
```

## Docker

```bash
docker build -t durga-dussehra-website:local .
docker run --rm -p 8080:8080 --name durga-website durga-dussehra-website:local
```

Open http://localhost:8080. Health endpoint: http://localhost:8080/health.

Or use Compose:

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f durga-website
docker compose down
```

## Jenkins CI/CD

1. Push the project to a Git repository and create a Jenkins Pipeline job.
2. Ensure the Jenkins agent has Node.js 22, Docker CLI/daemon access, Git, and `kubectl` for Kubernetes deployment.
3. Add a Jenkins username/password credential named `dockerhub-credentials`; use a Docker Hub access token as the password.
4. Add a Jenkins Secret file credential named `kubeconfig-production`.
5. Replace `your-dockerhub-user/durga-dussehra-website` in the `Jenkinsfile` and `k8s/deployment.yaml`.
6. Configure the pipeline to build all branches; publishing and deployment happen only on `main`.
7. Restrict production credentials and branch permissions.

Stages: checkout → install/test → build frontend → build container → publish immutable build tag and `latest` on main → apply Kubernetes manifests and wait for rollout.

Never commit secrets to source control or echo tokens into logs.

## GitHub Actions

`ci.yml` runs install, tests, and build on pushes and pull requests. For container publishing, add repository Actions secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

The Docker workflow publishes branch/tag/SHA tags. Update the image name in the workflow if your registry differs.

## Kubernetes

Update the image field in `k8s/deployment.yaml`, then:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl rollout status deployment/durga-website -n durga-website
kubectl get pods,svc -n durga-website
```

For local testing:

```bash
kubectl port-forward service/durga-website 8080:80 -n durga-website
```

The example Ingress requires an installed Ingress controller, real DNS, and a TLS secret. The optional HPA requires Metrics Server. Validate all manifests and cluster policies before production.

## Images and licensing

The gallery loads from Wikimedia Commons and therefore requires internet access in the visitor's browser. Each gallery card links to its source page and displays attribution. Review each page's current license before reusing an image. For production, download approved, optimized copies into `public/images/`, preserve attribution as required, and update `src/data.js` to use local paths.

- [Traditional maa Durga.jpg](https://commons.wikimedia.org/wiki/File:Traditional_maa_Durga.jpg) — CC BY-SA 4.0
- [Maa Durga Image.jpg](https://commons.wikimedia.org/wiki/File:Maa_Durga_Image.jpg) — CC BY-SA 4.0
- [Maa durga image.jpg](https://commons.wikimedia.org/wiki/File:Maa_durga_image.jpg) — CC BY-SA 4.0
- [Durga Puja Model of Maa Durga](https://commons.wikimedia.org/wiki/File:Durga_Puja_Model_of_Maa_Durga_from_Hindu_Mythology.jpg) — CC BY 4.0
- [MAA DURGA FACE.png](https://commons.wikimedia.org/wiki/File:MAA_DURGA_FACE.png) — verify source license
- [DURGA MAA WITH FAMILY.jpg](https://commons.wikimedia.org/wiki/File:DURGA_MAA_WITH_FAMILY.jpg) — CC BY-SA 4.0

## Production checklist

- [ ] Replace demo contact details and connect the form to a backend/provider.
- [ ] Verify image licenses and optimize assets.
- [ ] Replace example registry names and tags.
- [ ] Store CI/CD credentials in secret stores.
- [ ] Configure DNS and TLS before exposing the website.
- [ ] Validate accessibility and responsive layouts.
- [ ] Monitor rollout status and keep a known-good image tag for rollback.

## Rollback

```bash
kubectl rollout undo deployment/durga-website -n durga-website
kubectl rollout status deployment/durga-website -n durga-website
```

For a deterministic rollback, set the deployment image to a previously verified immutable tag. Do not guess the tag.

## License

Starter application code is provided for adaptation. Third-party images remain subject to their own licenses.
