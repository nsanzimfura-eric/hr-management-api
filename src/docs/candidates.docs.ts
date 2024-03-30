/**
 * @swagger
 * /api/v1/candidates/apply/{jobId}:
 *   post:
 *     summary: Apply to the specified job.
 *     tags:
 *       - Candidates
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to apply for.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Applicant's name."
 *                 required: true
 *               email:
 *                 type: string
 *                 description: "Applicant's email."
 *                 required: true
 *               phone:
 *                 type: string
 *                 description: "Applicant's phone number."
 *                 required: true
 *               github:
 *                 type: string
 *                 description: "Applicant's GitHub profile URL."
 *               linkedin:
 *                 type: string
 *                 description: "Applicant's LinkedIn profile URL."
 *               web:
 *                 type: string
 *                 description: "Applicant's personal website URL."
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "Resume file."
 *     responses:
 *       201:
 *         description: Successfully applied for the job.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 creator_id:
 *                   type: string
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 candidates:
 *                   type: array
 *                   items: {}
 *                 creator:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     deletedAt:
 *                       type: string
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the request due to authentication issues.
 *                 message:
 *                   type: string
 *                   description: Error message detailing the authentication issue.
 *       404:
 *         description: Job not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: the Query fetched not found.
 *                 message:
 *                   type: string
 *                   description: return message of missing data from database.
 *       500:
 *         description: A server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the app or serious prob.
 *                 message:
 *                   type: string
 *                   description: Error message in details.
 */
