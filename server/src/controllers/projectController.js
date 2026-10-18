import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ published: true })
    .sort({ sortOrder: 1, createdAt: 1 });

  res.status(200).json({
    success: true,
    message: 'Observatory projects retrieved',
    data: {
      projects,
      count: projects.length
    }
  });
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let project;
  if (mongoose.Types.ObjectId.isValid(id)) {
    project = await Project.findOne({ _id: id, published: true });
  } else {
    project = await Project.findOne({ slug: id, published: true });
  }

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found in Pip’s workshop.',
      errors: ['PROJECT_NOT_FOUND']
    });
  }

  res.status(200).json({
    success: true,
    message: 'Project retrieved',
    data: {
      project
    }
  });
});

