/**
 * @swagger
 * /api/v1/jobs/listOfJobs:
 *   get:
 *     summary: Fetch all jobs.
 *     tags:
 *       - Jobs
 *     responses:
 *       200:
 *         description: A list of jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       400:
 *         description: Request failed due to an error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful.
 *                 message:
 *                   type: string
 *                   description: Error message.
 * /api/v1/jobs/createJob:
 *   post:
 *     summary: Create new job
 *     description: You can create new Job if you are HR or signed in as HR.
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the job.
 *               deadline:
 *                 type: string
 *                 format: date
 *                 description: The deadline for job application submissions.
 *               description:
 *                 type: string
 *                 description: Detailed description of the job.
 *     responses:
 *       201:
 *         description: Job created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the creation was successful.
 *                 data:
 *                   $ref: '#/components/schemas/Job'
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
 *       400:
 *         description: Bad Request. Invalid request body/data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the request due to bad input data.
 *                 message:
 *                   type: string
 *                   description: Error message detailing the input data issue.
 * /api/v1/jobs/delete/{jobId}:
 *   delete:
 *     summary: Deletes a job by ID.
 *     description: Delete a specific job given its ID.
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to delete.
 *     responses:
 *       200:
 *         description: Job deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deletion was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: A message confirming the successful deletion of the job.
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
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The job ID.
 *         title:
 *           type: string
 *           description: The job title.
 *         description:
 *           type: string
 *           description: The job description.
 *         creator_id:
 *           type: string
 *           description: The ID of the job creator.
 *         deadline:
 *           type: string
 *           format: date-time
 *           description: The deadline for the job application.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the job was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the job was last updated.
 *         candidates:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Candidate'
 *         creator:
 *           $ref: '#/components/schemas/User'
 *     Candidate:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - phone
 *         - web
 *         - linkedin
 *         - github
 *       properties:
 *         id:
 *           type: string
 *           description: The candidate ID.
 *         name:
 *           type: string
 *           description: The candidate's name.
 *         email:
 *           type: string
 *           description: The candidate's email.
 *         phone:
 *           type: string
 *           description: The candidate's phone.
 *         github:
 *           type: string
 *           description: The candidate's GitHub link.
 *         linkedin:
 *           type: string
 *           description: The candidate's LinkedIn link.
 *         web:
 *           type: string
 *           description: The candidate's website/portfolio.
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID.
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 */
