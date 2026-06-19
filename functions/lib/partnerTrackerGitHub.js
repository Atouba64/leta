/**
 * Commit multiple files to GitHub in a single commit (Git Data API).
 */
async function commitFilesToGitHub({ token, owner, repo, branch, message, files }) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  const refUrl = `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`;
  const refRes = await fetch(refUrl, { headers });
  if (!refRes.ok) {
    const err = await refRes.text();
    throw new Error(`GitHub ref failed (${refRes.status}): ${err}`);
  }
  const ref = await refRes.json();
  const parentSha = ref.object.sha;

  const commitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits/${parentSha}`,
    { headers }
  );
  if (!commitRes.ok) {
    throw new Error(`GitHub commit lookup failed (${commitRes.status})`);
  }
  const parentCommit = await commitRes.json();

  const treeItems = [];
  for (const file of files) {
    const blobRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content: file.content, encoding: 'utf-8' }),
    });
    if (!blobRes.ok) {
      throw new Error(`GitHub blob failed for ${file.path} (${blobRes.status})`);
    }
    const blob = await blobRes.json();
    treeItems.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
  }

  const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ base_tree: parentCommit.tree.sha, tree: treeItems }),
  });
  if (!treeRes.ok) {
    throw new Error(`GitHub tree failed (${treeRes.status})`);
  }
  const tree = await treeRes.json();

  const newCommitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [parentSha],
    }),
  });
  if (!newCommitRes.ok) {
    throw new Error(`GitHub create commit failed (${newCommitRes.status})`);
  }
  const newCommit = await newCommitRes.json();

  const updateRefRes = await fetch(refUrl, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ sha: newCommit.sha }),
  });
  if (!updateRefRes.ok) {
    throw new Error(`GitHub update ref failed (${updateRefRes.status})`);
  }

  return {
    sha: newCommit.sha,
    url: `https://github.com/${owner}/${repo}/commit/${newCommit.sha}`,
  };
}

module.exports = { commitFilesToGitHub };
