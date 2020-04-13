module.exports = {
  schedule: {
    interval: '5m', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // const { app } = ctx;
    // const res = await ctx.service.jenkins.job.index();
    // let jobs = [];
    // const needUpdateDeployments = [];
    // if (Array.isArray(res)) {
    //   jobs = res.map(item => {
    //     if (item.lastSuccessfulBuild) {
    //       return item.name
    //     }
    //   }).filter(item => item);
    // }
    // for (const job of jobs) {
    //   let rows = await app.mysql.select('job_deployment', {
    //     where: { job: job }
    //   })
    //   if (rows.length) {
    //     let deploymentName = rows[0].deployment;
    //     try {
    //       let deploymentInfo = await ctx.service.k8s.deployment.show('default', deploymentName);
    //       let currentImage = deploymentInfo.body.spec.template.spec.containers[0].image;
    //       let imageName = currentImage.split(':')[0];
    //       let currentImageTag = currentImage.split(':')[1];
    //       let lastSuccessfulBuild = await ctx.service.jenkins.build.lastSuccessfulBuild({
    //         view: 'all',
    //         job,
    //       });
    //       let lastBuildImageTag = lastSuccessfulBuild.actions.filter(action => action._class === 'hudson.plugins.git.util.BuildData')[0].buildsByBranchName['refs/remotes/origin/master'].revision['SHA1'];
    //       if (currentImageTag !== lastBuildImageTag) {
    //         let patchData = {
    //           spec: {
    //             template: {
    //               spec: {
    //                 containers: [{
    //                   ...deploymentInfo.body.spec.template.spec.containers[0],
    //                   image: imageName + ':' + lastBuildImageTag
    //                 }]
    //               }
    //             }
    //           }
    //         }
    //         needUpdateDeployments.push({
    //           deployment: deploymentName,
    //           patchData,
    //           namespace: 'default'
    //         })
    //       }
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   }
    // }
    // try {
    //   for (const item of needUpdateDeployments) {
    //     await ctx.service.k8s.deployment.update(item.deployment, item.namespace, item.patchData);
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }
};