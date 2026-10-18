# Deployment runbook

## Before release
- Confirm CI passes on the candidate commit.
- Review the image tag and ensure the registry image exists.
- Confirm Jenkins credentials target the intended cluster.
- Confirm namespace and deployment names are correct.
- Ensure two replicas can be scheduled and monitoring is available.

## Release
1. Merge reviewed changes into `main`.
2. Observe the Jenkins pipeline.
3. Verify the image push.
4. Verify Kubernetes rollout completion.
5. Test the public URL or port-forward.
6. Check `/health` returns HTTP 200.
7. Validate the hero, gallery, quote copy, mobile menu, and form.
8. Record build number and image tag.

## Operational checks

```bash
kubectl get deployment,replicaset,pods,service -n durga-website
kubectl rollout status deployment/durga-website -n durga-website
kubectl describe deployment durga-website -n durga-website
kubectl logs deployment/durga-website -n durga-website --tail=100
```

A healthy `/health` response confirms Nginx is responding; it does not confirm external image hosts are available.

## Rollback

```bash
kubectl rollout undo deployment/durga-website -n durga-website
kubectl rollout status deployment/durga-website -n durga-website
```

For deterministic rollback, set the image to the previously verified immutable tag. Record release time, build number, image tag, issue, and rollback outcome. Never copy credentials into logs or incident notes.
