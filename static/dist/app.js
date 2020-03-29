/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "65a0c15-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "65a0c15-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "7f88f0ab0937b804b6a7";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/webpack-plugin-serve/client.js":
/*!******************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/client.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\n\n/**\n * @note This file exists merely as an easy reference for folks adding it to their configuration entries\n */\n\n(() => {\n  /* eslint-disable global-require */\n  const { run } = __webpack_require__(/*! ./lib/client/client */ \"../node_modules/webpack-plugin-serve/lib/client/client.js\");\n  let hash = '<unknown>';\n  let options;\n  try {\n    options = {\"compress\":null,\"headers\":null,\"historyFallback\":false,\"hmr\":true,\"host\":\"localhost\",\"liveReload\":true,\"log\":{\"level\":\"info\",\"prefix\":{\"template\":\"{{level}}\"},\"name\":\"webpack-plugin-serve\"},\"open\":true,\"port\":55555,\"progress\":true,\"ramdisk\":false,\"secure\":false,\"static\":[\"../../public/\"],\"status\":true,\"address\":\"localhost:55555\",\"compilerName\":null,\"wpsId\":\"65a0c15\"};\n  } catch (e) {\n    const { log } = __webpack_require__(/*! ./lib/client/log */ \"../node_modules/webpack-plugin-serve/lib/client/log.js\");\n    log.error(\n      'The entry for webpack-plugin-serve was included in your build, but it does not appear that the plugin was. Please check your configuration.'\n    );\n  }\n\n  try {\n    // eslint-disable-next-line camelcase\n    hash = __webpack_require__.h();\n  } catch (e) {} // eslint-disable-line no-empty\n\n  run(hash, options);\n})();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2NsaWVudC5qcz82ZGM0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsTUFBTSxHQUFHLG1CQUFPLENBQUMsc0ZBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLGNBQWMsa1hBQVc7QUFDekIsR0FBRztBQUNILFdBQVcsTUFBTSxHQUFHLG1CQUFPLENBQUMsZ0ZBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLHVCQUFnQjtBQUMzQixHQUFHLGFBQWE7O0FBRWhCO0FBQ0EsQ0FBQyIsImZpbGUiOiIuLi9ub2RlX21vZHVsZXMvd2VicGFjay1wbHVnaW4tc2VydmUvY2xpZW50LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cblxuLyoqXG4gKiBAbm90ZSBUaGlzIGZpbGUgZXhpc3RzIG1lcmVseSBhcyBhbiBlYXN5IHJlZmVyZW5jZSBmb3IgZm9sa3MgYWRkaW5nIGl0IHRvIHRoZWlyIGNvbmZpZ3VyYXRpb24gZW50cmllc1xuICovXG5cbigoKSA9PiB7XG4gIC8qIGVzbGludC1kaXNhYmxlIGdsb2JhbC1yZXF1aXJlICovXG4gIGNvbnN0IHsgcnVuIH0gPSByZXF1aXJlKCcuL2xpYi9jbGllbnQvY2xpZW50Jyk7XG4gIGxldCBoYXNoID0gJzx1bmtub3duPic7XG4gIGxldCBvcHRpb25zO1xuICB0cnkge1xuICAgIG9wdGlvbnMgPSDKjsmQybnJlG9zx53KjMm5x51zO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc3QgeyBsb2cgfSA9IHJlcXVpcmUoJy4vbGliL2NsaWVudC9sb2cnKTtcbiAgICBsb2cuZXJyb3IoXG4gICAgICAnVGhlIGVudHJ5IGZvciB3ZWJwYWNrLXBsdWdpbi1zZXJ2ZSB3YXMgaW5jbHVkZWQgaW4geW91ciBidWlsZCwgYnV0IGl0IGRvZXMgbm90IGFwcGVhciB0aGF0IHRoZSBwbHVnaW4gd2FzLiBQbGVhc2UgY2hlY2sgeW91ciBjb25maWd1cmF0aW9uLidcbiAgICApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgaGFzaCA9IF9fd2VicGFja19oYXNoX187XG4gIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcblxuICBydW4oaGFzaCwgb3B0aW9ucyk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/client.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/ClientSocket.js":
/*!***********************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/ClientSocket.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, refresh, warn } = __webpack_require__(/*! ./log */ \"../node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\n// ignore 1008 (HTTP 400 equivalent) and 1011 (HTTP 500 equivalent)\nconst ignoreCodes = [1008, 1011];\nconst maxAttempts = 10;\n\nclass ClientSocket {\n  constructor(options, ...args) {\n    this.args = args;\n    this.attempts = 0;\n    this.eventHandlers = [];\n    this.options = options;\n    this.retrying = false;\n\n    this.connect();\n  }\n\n  addEventListener(...args) {\n    this.eventHandlers.push(args);\n    this.socket.addEventListener(...args);\n  }\n\n  close() {\n    this.socket.close();\n  }\n\n  connect() {\n    if (this.socket) {\n      delete this.socket;\n    }\n\n    this.connecting = true;\n\n    this.socket = new WebSocket(...this.args);\n\n    if (this.options.retry) {\n      this.socket.addEventListener('close', (event) => {\n        if (ignoreCodes.includes(event.code)) {\n          return;\n        }\n\n        if (!this.retrying) {\n          warn(`The WebSocket was closed and will attempt to reconnect`);\n        }\n\n        this.reconnect();\n      });\n    } else {\n      this.socket.onclose = () => warn(`The client WebSocket was closed. ${refresh}`);\n    }\n\n    this.socket.addEventListener('open', () => {\n      this.attempts = 0;\n      this.retrying = false;\n    });\n\n    if (this.eventHandlers.length) {\n      for (const [name, fn] of this.eventHandlers) {\n        this.socket.addEventListener(name, fn);\n      }\n    }\n  }\n\n  reconnect() {\n    this.attempts += 1;\n    this.retrying = true;\n\n    if (this.attempts > maxAttempts) {\n      error(`The WebSocket could not be reconnected. ${refresh}`);\n      this.retrying = false;\n      return;\n    }\n\n    const timeout = 1000 * this.attempts ** 2;\n\n    setTimeout(() => this.connect(this.args), timeout);\n  }\n\n  removeEventListener(...args) {\n    const [, handler] = args;\n    this.eventHandlers = this.eventHandlers.filter(([, fn]) => fn === handler);\n    this.socket.removeEventListener(...args);\n  }\n}\n\nmodule.exports = { ClientSocket };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvQ2xpZW50U29ja2V0LmpzP2RiNjEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyx1QkFBdUIsR0FBRyxtQkFBTyxDQUFDLHFFQUFPOztBQUVoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLDJFQUEyRSxRQUFRO0FBQ25GOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVEQUF1RCxRQUFRO0FBQy9EO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvQ2xpZW50U29ja2V0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgZXJyb3IsIHJlZnJlc2gsIHdhcm4gfSA9IHJlcXVpcmUoJy4vbG9nJykoKTtcblxuLy8gaWdub3JlIDEwMDggKEhUVFAgNDAwIGVxdWl2YWxlbnQpIGFuZCAxMDExIChIVFRQIDUwMCBlcXVpdmFsZW50KVxuY29uc3QgaWdub3JlQ29kZXMgPSBbMTAwOCwgMTAxMV07XG5jb25zdCBtYXhBdHRlbXB0cyA9IDEwO1xuXG5jbGFzcyBDbGllbnRTb2NrZXQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCAuLi5hcmdzKSB7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmF0dGVtcHRzID0gMDtcbiAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSBbXTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucmV0cnlpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lciguLi5hcmdzKSB7XG4gICAgdGhpcy5ldmVudEhhbmRsZXJzLnB1c2goYXJncyk7XG4gICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lciguLi5hcmdzKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gIH1cblxuICBjb25uZWN0KCkge1xuICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgZGVsZXRlIHRoaXMuc29ja2V0O1xuICAgIH1cblxuICAgIHRoaXMuY29ubmVjdGluZyA9IHRydWU7XG5cbiAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQoLi4udGhpcy5hcmdzKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmV0cnkpIHtcbiAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChpZ25vcmVDb2Rlcy5pbmNsdWRlcyhldmVudC5jb2RlKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5yZXRyeWluZykge1xuICAgICAgICAgIHdhcm4oYFRoZSBXZWJTb2NrZXQgd2FzIGNsb3NlZCBhbmQgd2lsbCBhdHRlbXB0IHRvIHJlY29ubmVjdGApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvY2tldC5vbmNsb3NlID0gKCkgPT4gd2FybihgVGhlIGNsaWVudCBXZWJTb2NrZXQgd2FzIGNsb3NlZC4gJHtyZWZyZXNofWApO1xuICAgIH1cblxuICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB7XG4gICAgICB0aGlzLmF0dGVtcHRzID0gMDtcbiAgICAgIHRoaXMucmV0cnlpbmcgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmV2ZW50SGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBmbl0gb2YgdGhpcy5ldmVudEhhbmRsZXJzKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZm4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlY29ubmVjdCgpIHtcbiAgICB0aGlzLmF0dGVtcHRzICs9IDE7XG4gICAgdGhpcy5yZXRyeWluZyA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5hdHRlbXB0cyA+IG1heEF0dGVtcHRzKSB7XG4gICAgICBlcnJvcihgVGhlIFdlYlNvY2tldCBjb3VsZCBub3QgYmUgcmVjb25uZWN0ZWQuICR7cmVmcmVzaH1gKTtcbiAgICAgIHRoaXMucmV0cnlpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lb3V0ID0gMTAwMCAqIHRoaXMuYXR0ZW1wdHMgKiogMjtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jb25uZWN0KHRoaXMuYXJncyksIHRpbWVvdXQpO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKSB7XG4gICAgY29uc3QgWywgaGFuZGxlcl0gPSBhcmdzO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVycyA9IHRoaXMuZXZlbnRIYW5kbGVycy5maWx0ZXIoKFssIGZuXSkgPT4gZm4gPT09IGhhbmRsZXIpO1xuICAgIHRoaXMuc29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoLi4uYXJncyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IENsaWVudFNvY2tldCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/ClientSocket.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/client.js":
/*!*****************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/client.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\n/* eslint-disable global-require */\nconst run = (buildHash, options) => {\n  const { address, client = {}, progress, secure, status } = options;\n\n  options.firstInstance = !window.webpackPluginServe; // eslint-disable-line no-param-reassign\n\n  window.webpackPluginServe = window.webpackPluginServe || {\n    compilers: {}\n  };\n  window.webpackPluginServe.silent = !!client.silent;\n\n  const { ClientSocket } = __webpack_require__(/*! ./ClientSocket */ \"../node_modules/webpack-plugin-serve/lib/client/ClientSocket.js\");\n  const { replace } = __webpack_require__(/*! ./hmr */ \"../node_modules/webpack-plugin-serve/lib/client/hmr.js\");\n  const { error, info, warn } = __webpack_require__(/*! ./log */ \"../node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\n  const protocol = secure ? 'wss' : 'ws';\n  const socket = new ClientSocket(client, `${protocol}://${client.address || address}/wps`);\n\n  const { compilerName } = options;\n\n  window.webpackPluginServe.compilers[compilerName] = {};\n\n  // prevents ECONNRESET errors on the server\n  window.addEventListener('beforeunload', () => socket.close());\n\n  socket.addEventListener('message', (message) => {\n    const { action, data = {} } = JSON.parse(message.data);\n    const { errors, hash = '<?>', warnings } = data || {};\n    const shortHash = hash.slice(0, 7);\n    const identifier = options.compilerName ? `(Compiler: ${options.compilerName}) ` : '';\n    const compiler = window.webpackPluginServe.compilers[compilerName];\n    const { wpsId } = data;\n\n    switch (action) {\n      case 'build':\n        compiler.done = false;\n        break;\n      case 'connected':\n        info(`WebSocket connected ${identifier}`);\n        break;\n      case 'done':\n        compiler.done = true;\n        break;\n      case 'problems':\n        if (data.errors.length) {\n          error(`${identifier}Build ${shortHash} produced errors:\\n`, errors);\n        }\n        if (data.warnings.length) {\n          warn(`${identifier}Build ${shortHash} produced warnings:\\n`, warnings);\n        }\n        break;\n      case 'reload':\n        window.location.reload();\n        break;\n      case 'replace':\n        // actions with a wpsId in tow indicate actions that should only be executed when the wpsId sent\n        // matches the wpsId set in options. this is how we can identify multiple compilers in the\n        // client.\n        if (wpsId && wpsId === options.wpsId) {\n          replace(buildHash, hash);\n        }\n        break;\n      default:\n    }\n  });\n\n  if (options.firstInstance) {\n    if (progress === 'minimal') {\n      const { init } = __webpack_require__(/*! ./overlays/progress-minimal */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js\");\n      init(options, socket);\n    } else if (progress) {\n      const { init } = __webpack_require__(/*! ./overlays/progress */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/progress.js\");\n      init(options, socket);\n    }\n\n    if (status) {\n      const { init } = __webpack_require__(/*! ./overlays/status */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/status.js\");\n      init(options, socket);\n    }\n\n    if (true) {\n      info('Hot Module Replacement is active');\n\n      if (options.liveReload) {\n        info('Live Reload taking precedence over Hot Module Replacement');\n      }\n    } else {}\n\n    if (false) {}\n  }\n};\n\nmodule.exports = { run };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvY2xpZW50LmpzP2NkZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMscUJBQXFCLDRCQUE0Qjs7QUFFMUQscURBQXFEOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLGVBQWUsR0FBRyxtQkFBTyxDQUFDLHVGQUFnQjtBQUNuRCxTQUFTLFVBQVUsR0FBRyxtQkFBTyxDQUFDLHFFQUFPO0FBQ3JDLFNBQVMsb0JBQW9CLEdBQUcsbUJBQU8sQ0FBQyxxRUFBTzs7QUFFL0M7QUFDQSw2Q0FBNkMsU0FBUyxLQUFLLDBCQUEwQjs7QUFFckYsU0FBUyxlQUFlOztBQUV4Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxrQkFBa0IsRUFBRTtBQUMvQixXQUFXLGlDQUFpQztBQUM1QztBQUNBLDREQUE0RCxxQkFBcUI7QUFDakY7QUFDQSxXQUFXLFFBQVE7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsV0FBVztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsV0FBVyxRQUFRLFVBQVU7QUFDaEQ7QUFDQTtBQUNBLGtCQUFrQixXQUFXLFFBQVEsVUFBVTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxhQUFhLE9BQU8sR0FBRyxtQkFBTyxDQUFDLGlIQUE2QjtBQUM1RDtBQUNBLEtBQUs7QUFDTCxhQUFhLE9BQU8sR0FBRyxtQkFBTyxDQUFDLGlHQUFxQjtBQUNwRDtBQUNBOztBQUVBO0FBQ0EsYUFBYSxPQUFPLEdBQUcsbUJBQU8sQ0FBQyw2RkFBbUI7QUFDbEQ7QUFDQTs7QUFFQSxRQUFRLElBQVU7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSyxNQUFNLEVBRU47O0FBRUwsUUFBUSxLQUFpQyxFQUFFLEVBRXRDO0FBQ0w7QUFDQTs7QUFFQSxrQkFBa0IiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvY2xpZW50LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbi8qIGVzbGludC1kaXNhYmxlIGdsb2JhbC1yZXF1aXJlICovXG5jb25zdCBydW4gPSAoYnVpbGRIYXNoLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHsgYWRkcmVzcywgY2xpZW50ID0ge30sIHByb2dyZXNzLCBzZWN1cmUsIHN0YXR1cyB9ID0gb3B0aW9ucztcblxuICBvcHRpb25zLmZpcnN0SW5zdGFuY2UgPSAhd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXG4gIHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUgPSB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlIHx8IHtcbiAgICBjb21waWxlcnM6IHt9XG4gIH07XG4gIHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUuc2lsZW50ID0gISFjbGllbnQuc2lsZW50O1xuXG4gIGNvbnN0IHsgQ2xpZW50U29ja2V0IH0gPSByZXF1aXJlKCcuL0NsaWVudFNvY2tldCcpO1xuICBjb25zdCB7IHJlcGxhY2UgfSA9IHJlcXVpcmUoJy4vaG1yJyk7XG4gIGNvbnN0IHsgZXJyb3IsIGluZm8sIHdhcm4gfSA9IHJlcXVpcmUoJy4vbG9nJykoKTtcblxuICBjb25zdCBwcm90b2NvbCA9IHNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgY29uc3Qgc29ja2V0ID0gbmV3IENsaWVudFNvY2tldChjbGllbnQsIGAke3Byb3RvY29sfTovLyR7Y2xpZW50LmFkZHJlc3MgfHwgYWRkcmVzc30vd3BzYCk7XG5cbiAgY29uc3QgeyBjb21waWxlck5hbWUgfSA9IG9wdGlvbnM7XG5cbiAgd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZS5jb21waWxlcnNbY29tcGlsZXJOYW1lXSA9IHt9O1xuXG4gIC8vIHByZXZlbnRzIEVDT05OUkVTRVQgZXJyb3JzIG9uIHRoZSBzZXJ2ZXJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHNvY2tldC5jbG9zZSgpKTtcblxuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgPSB7fSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgIGNvbnN0IHsgZXJyb3JzLCBoYXNoID0gJzw/PicsIHdhcm5pbmdzIH0gPSBkYXRhIHx8IHt9O1xuICAgIGNvbnN0IHNob3J0SGFzaCA9IGhhc2guc2xpY2UoMCwgNyk7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IG9wdGlvbnMuY29tcGlsZXJOYW1lID8gYChDb21waWxlcjogJHtvcHRpb25zLmNvbXBpbGVyTmFtZX0pIGAgOiAnJztcbiAgICBjb25zdCBjb21waWxlciA9IHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUuY29tcGlsZXJzW2NvbXBpbGVyTmFtZV07XG4gICAgY29uc3QgeyB3cHNJZCB9ID0gZGF0YTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICdidWlsZCc6XG4gICAgICAgIGNvbXBpbGVyLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb25uZWN0ZWQnOlxuICAgICAgICBpbmZvKGBXZWJTb2NrZXQgY29ubmVjdGVkICR7aWRlbnRpZmllcn1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkb25lJzpcbiAgICAgICAgY29tcGlsZXIuZG9uZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJvYmxlbXMnOlxuICAgICAgICBpZiAoZGF0YS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgZXJyb3IoYCR7aWRlbnRpZmllcn1CdWlsZCAke3Nob3J0SGFzaH0gcHJvZHVjZWQgZXJyb3JzOlxcbmAsIGVycm9ycyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEud2FybmluZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgd2FybihgJHtpZGVudGlmaWVyfUJ1aWxkICR7c2hvcnRIYXNofSBwcm9kdWNlZCB3YXJuaW5nczpcXG5gLCB3YXJuaW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgIC8vIGFjdGlvbnMgd2l0aCBhIHdwc0lkIGluIHRvdyBpbmRpY2F0ZSBhY3Rpb25zIHRoYXQgc2hvdWxkIG9ubHkgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgd3BzSWQgc2VudFxuICAgICAgICAvLyBtYXRjaGVzIHRoZSB3cHNJZCBzZXQgaW4gb3B0aW9ucy4gdGhpcyBpcyBob3cgd2UgY2FuIGlkZW50aWZ5IG11bHRpcGxlIGNvbXBpbGVycyBpbiB0aGVcbiAgICAgICAgLy8gY2xpZW50LlxuICAgICAgICBpZiAod3BzSWQgJiYgd3BzSWQgPT09IG9wdGlvbnMud3BzSWQpIHtcbiAgICAgICAgICByZXBsYWNlKGJ1aWxkSGFzaCwgaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKG9wdGlvbnMuZmlyc3RJbnN0YW5jZSkge1xuICAgIGlmIChwcm9ncmVzcyA9PT0gJ21pbmltYWwnKSB7XG4gICAgICBjb25zdCB7IGluaXQgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbCcpO1xuICAgICAgaW5pdChvcHRpb25zLCBzb2NrZXQpO1xuICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MpIHtcbiAgICAgIGNvbnN0IHsgaW5pdCB9ID0gcmVxdWlyZSgnLi9vdmVybGF5cy9wcm9ncmVzcycpO1xuICAgICAgaW5pdChvcHRpb25zLCBzb2NrZXQpO1xuICAgIH1cblxuICAgIGlmIChzdGF0dXMpIHtcbiAgICAgIGNvbnN0IHsgaW5pdCB9ID0gcmVxdWlyZSgnLi9vdmVybGF5cy9zdGF0dXMnKTtcbiAgICAgIGluaXQob3B0aW9ucywgc29ja2V0KTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgaW5mbygnSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBhY3RpdmUnKTtcblxuICAgICAgaWYgKG9wdGlvbnMubGl2ZVJlbG9hZCkge1xuICAgICAgICBpbmZvKCdMaXZlIFJlbG9hZCB0YWtpbmcgcHJlY2VkZW5jZSBvdmVyIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgd2FybignSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBpbmFjdGl2ZScpO1xuICAgIH1cblxuICAgIGlmICghbW9kdWxlLmhvdCAmJiBvcHRpb25zLmxpdmVSZWxvYWQpIHtcbiAgICAgIGluZm8oJ0xpdmUgUmVsb2FkIGlzIGFjdGl2ZScpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHJ1biB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/client.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/hmr.js":
/*!**************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/hmr.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, info, refresh, warn } = __webpack_require__(/*! ./log */ \"../node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\nlet latest = true;\n\nconst hmr = {\n  onUnaccepted(data) {\n    warn('Change in unaccepted module(s):\\n', data);\n    warn(data);\n  },\n  onDeclined(data) {\n    warn('Change in declined module(s):\\n', data);\n  },\n  onErrored(data) {\n    error('Error in module(s):\\n', data);\n  }\n};\n\nconst replace = async (buildHash, hash) => {\n  const { apply, check, status } = module.hot;\n\n  if (hash) {\n    // eslint-disable-next-line no-undef\n    latest = hash.includes(buildHash);\n  }\n\n  if (!latest) {\n    const hmrStatus = status();\n\n    if (hmrStatus === 'abort' || hmrStatus === 'fail') {\n      warn(`An HMR update was triggered, but ${hmrStatus}ed. ${refresh}`);\n      return;\n    }\n\n    let modules;\n\n    try {\n      modules = await check(false);\n    } catch (e) {\n      // noop. this typically happens when a MultiCompiler has more than one compiler that includes\n      // this script, and an update happens with a hash that isn't part of the compiler/module this\n      // instance was loaded for.\n      return;\n    }\n\n    if (!modules) {\n      warn(`No modules found for replacement. ${refresh}`);\n      return;\n    }\n\n    modules = await apply(hmr);\n\n    if (modules) {\n      latest = true;\n      info(`Build ${hash.slice(0, 7)} replaced:\\n`, modules);\n    }\n  }\n};\n\nmodule.exports = { replace };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvaG1yLmpzP2M4YTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyw2QkFBNkIsR0FBRyxtQkFBTyxDQUFDLHFFQUFPOztBQUV0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyx1QkFBdUI7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsVUFBVSxNQUFNLFFBQVE7QUFDdkU7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsUUFBUTtBQUN4RDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvaG1yLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgZXJyb3IsIGluZm8sIHJlZnJlc2gsIHdhcm4gfSA9IHJlcXVpcmUoJy4vbG9nJykoKTtcblxubGV0IGxhdGVzdCA9IHRydWU7XG5cbmNvbnN0IGhtciA9IHtcbiAgb25VbmFjY2VwdGVkKGRhdGEpIHtcbiAgICB3YXJuKCdDaGFuZ2UgaW4gdW5hY2NlcHRlZCBtb2R1bGUocyk6XFxuJywgZGF0YSk7XG4gICAgd2FybihkYXRhKTtcbiAgfSxcbiAgb25EZWNsaW5lZChkYXRhKSB7XG4gICAgd2FybignQ2hhbmdlIGluIGRlY2xpbmVkIG1vZHVsZShzKTpcXG4nLCBkYXRhKTtcbiAgfSxcbiAgb25FcnJvcmVkKGRhdGEpIHtcbiAgICBlcnJvcignRXJyb3IgaW4gbW9kdWxlKHMpOlxcbicsIGRhdGEpO1xuICB9XG59O1xuXG5jb25zdCByZXBsYWNlID0gYXN5bmMgKGJ1aWxkSGFzaCwgaGFzaCkgPT4ge1xuICBjb25zdCB7IGFwcGx5LCBjaGVjaywgc3RhdHVzIH0gPSBtb2R1bGUuaG90O1xuXG4gIGlmIChoYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgbGF0ZXN0ID0gaGFzaC5pbmNsdWRlcyhidWlsZEhhc2gpO1xuICB9XG5cbiAgaWYgKCFsYXRlc3QpIHtcbiAgICBjb25zdCBobXJTdGF0dXMgPSBzdGF0dXMoKTtcblxuICAgIGlmIChobXJTdGF0dXMgPT09ICdhYm9ydCcgfHwgaG1yU3RhdHVzID09PSAnZmFpbCcpIHtcbiAgICAgIHdhcm4oYEFuIEhNUiB1cGRhdGUgd2FzIHRyaWdnZXJlZCwgYnV0ICR7aG1yU3RhdHVzfWVkLiAke3JlZnJlc2h9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG1vZHVsZXM7XG5cbiAgICB0cnkge1xuICAgICAgbW9kdWxlcyA9IGF3YWl0IGNoZWNrKGZhbHNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBub29wLiB0aGlzIHR5cGljYWxseSBoYXBwZW5zIHdoZW4gYSBNdWx0aUNvbXBpbGVyIGhhcyBtb3JlIHRoYW4gb25lIGNvbXBpbGVyIHRoYXQgaW5jbHVkZXNcbiAgICAgIC8vIHRoaXMgc2NyaXB0LCBhbmQgYW4gdXBkYXRlIGhhcHBlbnMgd2l0aCBhIGhhc2ggdGhhdCBpc24ndCBwYXJ0IG9mIHRoZSBjb21waWxlci9tb2R1bGUgdGhpc1xuICAgICAgLy8gaW5zdGFuY2Ugd2FzIGxvYWRlZCBmb3IuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFtb2R1bGVzKSB7XG4gICAgICB3YXJuKGBObyBtb2R1bGVzIGZvdW5kIGZvciByZXBsYWNlbWVudC4gJHtyZWZyZXNofWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG1vZHVsZXMgPSBhd2FpdCBhcHBseShobXIpO1xuXG4gICAgaWYgKG1vZHVsZXMpIHtcbiAgICAgIGxhdGVzdCA9IHRydWU7XG4gICAgICBpbmZvKGBCdWlsZCAke2hhc2guc2xpY2UoMCwgNyl9IHJlcGxhY2VkOlxcbmAsIG1vZHVsZXMpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHJlcGxhY2UgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/hmr.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/log.js":
/*!**************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/log.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, info, warn } = console;\nconst log = {\n  error: error.bind(console, '⬡ wps:'),\n  info: info.bind(console, '⬡ wps:'),\n  refresh: 'Please refresh the page',\n  warn: warn.bind(console, '⬡ wps:')\n};\nconst noop = () => {};\nconst silent = {\n  error: noop,\n  info: noop,\n  warn: noop\n};\n\nmodule.exports = () => (window.webpackPluginServe.silent ? silent : log);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvbG9nLmpzP2Y5NzciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxvQkFBb0I7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6Ii4uL25vZGVfbW9kdWxlcy93ZWJwYWNrLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50L2xvZy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGVycm9yLCBpbmZvLCB3YXJuIH0gPSBjb25zb2xlO1xuY29uc3QgbG9nID0ge1xuICBlcnJvcjogZXJyb3IuYmluZChjb25zb2xlLCAn4qyhIHdwczonKSxcbiAgaW5mbzogaW5mby5iaW5kKGNvbnNvbGUsICfirKEgd3BzOicpLFxuICByZWZyZXNoOiAnUGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2UnLFxuICB3YXJuOiB3YXJuLmJpbmQoY29uc29sZSwgJ+KsoSB3cHM6Jylcbn07XG5jb25zdCBub29wID0gKCkgPT4ge307XG5jb25zdCBzaWxlbnQgPSB7XG4gIGVycm9yOiBub29wLFxuICBpbmZvOiBub29wLFxuICB3YXJuOiBub29wXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+ICh3aW5kb3cud2VicGFja1BsdWdpblNlcnZlLnNpbGVudCA/IHNpbGVudCA6IGxvZyk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/log.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js":
/*!************************************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml } = __webpack_require__(/*! ./util */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-progress-minimal';\nconst html = `\n<div id=\"${ns}\" class=\"${ns}-hidden\">\n  <div id=\"${ns}-bar\"></div>\n</div>\n`;\nconst css = `\n#${ns} {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 4px;\n  width: 100vw;\n  z-index: 2147483645;\n}\n\n#${ns}-bar {\n  width: 0%;\n  height: 4px;\n  background-color: rgb(186, 223, 172);\n  transition: width 1s ease-in-out;\n}\n\n.${ns}-hidden{\n  display: none;\n}\n`;\n\nconst update = (percent) => {\n  const bar = document.querySelector(`#${ns}-bar`);\n  bar.style.width = `${percent}%`;\n};\n\nconst reset = (wrapper) => {\n  wrapper.classList.add(`${ns}-hidden`);\n  setTimeout(() => update(0), 1e3);\n};\n\nconst init = (options, socket) => {\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      addHtml(html);\n    });\n  }\n\n  socket.addEventListener('message', (message) => {\n    const { action, data } = JSON.parse(message.data);\n\n    if (action !== 'progress') {\n      return;\n    }\n\n    const percent = Math.floor(data.percent * 100);\n    const wrapper = document.querySelector(`#${ns}`);\n\n    wrapper.classList.remove(`${ns}-hidden`);\n\n    if (data.percent === 1) {\n      setTimeout(() => reset(wrapper), 5e3);\n    }\n\n    update(percent);\n  });\n};\n\nmodule.exports = {\n  init\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbC5qcz82NjFjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sa0JBQWtCLEdBQUcsbUJBQU8sQ0FBQyxnRkFBUTs7QUFFNUM7QUFDQTtBQUNBLFdBQVcsR0FBRyxXQUFXLEdBQUc7QUFDNUIsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDLEdBQUc7QUFDNUMsdUJBQXVCLFFBQVE7QUFDL0I7O0FBRUE7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxXQUFXLGVBQWU7O0FBRTFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxHQUFHOztBQUVsRCxnQ0FBZ0MsR0FBRzs7QUFFbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiIuLi9ub2RlX21vZHVsZXMvd2VicGFjay1wbHVnaW4tc2VydmUvbGliL2NsaWVudC9vdmVybGF5cy9wcm9ncmVzcy1taW5pbWFsLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbCwgTWF0aGV1cyBHb27Dp2FsdmVzIGRhIFNpbHZhXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtcHJvZ3Jlc3MtbWluaW1hbCc7XG5jb25zdCBodG1sID0gYFxuPGRpdiBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1oaWRkZW5cIj5cbiAgPGRpdiBpZD1cIiR7bnN9LWJhclwiPjwvZGl2PlxuPC9kaXY+XG5gO1xuY29uc3QgY3NzID0gYFxuIyR7bnN9IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogNHB4O1xuICB3aWR0aDogMTAwdnc7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbiMke25zfS1iYXIge1xuICB3aWR0aDogMCU7XG4gIGhlaWdodDogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg2LCAyMjMsIDE3Mik7XG4gIHRyYW5zaXRpb246IHdpZHRoIDFzIGVhc2UtaW4tb3V0O1xufVxuXG4uJHtuc30taGlkZGVue1xuICBkaXNwbGF5OiBub25lO1xufVxuYDtcblxuY29uc3QgdXBkYXRlID0gKHBlcmNlbnQpID0+IHtcbiAgY29uc3QgYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWJhcmApO1xuICBiYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xufTtcblxuY29uc3QgcmVzZXQgPSAod3JhcHBlcikgPT4ge1xuICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWhpZGRlbmApO1xuICBzZXRUaW1lb3V0KCgpID0+IHVwZGF0ZSgwKSwgMWUzKTtcbn07XG5cbmNvbnN0IGluaXQgPSAob3B0aW9ucywgc29ja2V0KSA9PiB7XG4gIGlmIChvcHRpb25zLmZpcnN0SW5zdGFuY2UpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgYWRkQ3NzKGNzcyk7XG4gICAgICBhZGRIdG1sKGh0bWwpO1xuICAgIH0pO1xuICB9XG5cbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG5cbiAgICBpZiAoYWN0aW9uICE9PSAncHJvZ3Jlc3MnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudCA9IE1hdGguZmxvb3IoZGF0YS5wZXJjZW50ICogMTAwKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG5cbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LWhpZGRlbmApO1xuXG4gICAgaWYgKGRhdGEucGVyY2VudCA9PT0gMSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNldCh3cmFwcGVyKSwgNWUzKTtcbiAgICB9XG5cbiAgICB1cGRhdGUocGVyY2VudCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXRcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/overlays/progress.js":
/*!****************************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/overlays/progress.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml } = __webpack_require__(/*! ./util */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-progress';\nconst css = `\n@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');\n\n#${ns}{\n  width: 200px;\n  height: 200px;\n  position: absolute;\n  right: 5%;\n  top: 5%;\n  transition: opacity .25s ease-in-out;\n  z-index: 2147483645;\n}\n\n#${ns}-bg {\n  fill: #282d35;\n}\n\n#${ns}-fill {\n  fill: rgba(0, 0, 0, 0);\n  stroke: rgb(186, 223, 172);\n  stroke-dasharray: 219.99078369140625;\n  stroke-dashoffset: -219.99078369140625;\n  stroke-width: 10;\n  transform: rotate(90deg)translate(0px, -80px);\n  transition: stroke-dashoffset 1s;\n}\n\n#${ns}-percent {\n  font-family: 'Open Sans';\n  font-size: 18px;\n  fill: #ffffff;\n}\n\n#${ns}-percent-value {\n  dominant-baseline: middle;\n  text-anchor: middle;\n}\n\n#${ns}-percent-super {\n  fill: #bdc3c7;\n  font-size: .45em;\n  baseline-shift: 10%;\n}\n\n.${ns}-noselect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n\n@keyframes ${ns}-hidden-display {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: scale(1);\n\t\t-webkit-transform: scale(1);\n\t}\n\t99% {\n\t\tdisplay: inline-flex;\n\t\topacity: 0;\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t}\n\t100% {\n\t\tdisplay: none;\n\t\topacity: 0;\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t}\n}\n\n.${ns}-hidden {\n  animation: ${ns}-hidden-display .3s;\n  animation-fill-mode:forwards;\n  display: inline-flex;\n}\n\n.${ns}-hidden-onload {\n  display: none;\n}\n`;\n\nconst html = `\n<svg id=\"${ns}\" class=\"${ns}-noselect ${ns}-hidden-onload\" x=\"0px\" y=\"0px\" viewBox=\"0 0 80 80\">\n  <circle id=\"${ns}-bg\" cx=\"50%\" cy=\"50%\" r=\"35\"></circle>\n  <path id=\"${ns}-fill\" d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\" />\n  <text id=\"${ns}-percent\" x=\"50%\" y=\"51%\"><tspan id=\"${ns}-percent-value\">0</tspan><tspan id=\"${ns}-percent-super\">%</tspan></text>\n</svg>\n`;\n\nconst update = (percent) => {\n  const max = -219.99078369140625;\n  const value = document.querySelector(`#${ns}-percent-value`);\n  const track = document.querySelector(`#${ns}-fill`);\n  const offset = ((100 - percent) / 100) * max;\n\n  track.setAttribute('style', `stroke-dashoffset: ${offset}`);\n  value.innerHTML = percent.toString();\n};\n\nconst reset = (svg) => {\n  svg.classList.add(`${ns}-hidden`);\n  setTimeout(() => update(0), 1e3);\n};\n\nconst init = (options, socket) => {\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      addHtml(html);\n    });\n  }\n\n  socket.addEventListener('message', (message) => {\n    const { action, data } = JSON.parse(message.data);\n\n    if (action !== 'progress') {\n      return;\n    }\n\n    const percent = Math.floor(data.percent * 100);\n    const svg = document.querySelector(`#${ns}`);\n\n    if (!svg) {\n      return;\n    }\n\n    // we can safely call this even if it doesn't have the class\n    svg.classList.remove(`${ns}-hidden`, `${ns}-hidden-onload`);\n\n    if (data.percent === 1) {\n      setTimeout(() => reset(svg), 5e3);\n    }\n\n    update(percent);\n  });\n};\n\nmodule.exports = { init };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MuanM/MzFhMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGtCQUFrQixHQUFHLG1CQUFPLENBQUMsZ0ZBQVE7O0FBRTVDO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTixlQUFlLEdBQUc7QUFDbEI7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsR0FBRyxXQUFXLEdBQUcsWUFBWSxHQUFHO0FBQzNDLGdCQUFnQixHQUFHO0FBQ25CLGNBQWMsR0FBRztBQUNqQixjQUFjLEdBQUcsdUNBQXVDLEdBQUcsc0NBQXNDLEdBQUc7QUFDcEc7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDLEdBQUc7QUFDOUMsMkNBQTJDLEdBQUc7QUFDOUM7O0FBRUEsb0RBQW9ELE9BQU87QUFDM0Q7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixHQUFHO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLFdBQVcsZUFBZTs7QUFFMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLEdBQUc7O0FBRTlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixHQUFHLGFBQWEsR0FBRzs7QUFFL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGtCQUFrQiIsImZpbGUiOiIuLi9ub2RlX21vZHVsZXMvd2VicGFjay1wbHVnaW4tc2VydmUvbGliL2NsaWVudC9vdmVybGF5cy9wcm9ncmVzcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGwsIE1hdGhldXMgR29uw6dhbHZlcyBkYSBTaWx2YVxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgYWRkQ3NzLCBhZGRIdG1sIH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgbnMgPSAnd3BzLXByb2dyZXNzJztcbmNvbnN0IGNzcyA9IGBcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zOjQwMCw3MDAnKTtcblxuIyR7bnN9e1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDUlO1xuICB0b3A6IDUlO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbiMke25zfS1iZyB7XG4gIGZpbGw6ICMyODJkMzU7XG59XG5cbiMke25zfS1maWxsIHtcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAwKTtcbiAgc3Ryb2tlOiByZ2IoMTg2LCAyMjMsIDE3Mik7XG4gIHN0cm9rZS1kYXNoYXJyYXk6IDIxOS45OTA3ODM2OTE0MDYyNTtcbiAgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0yMTkuOTkwNzgzNjkxNDA2MjU7XG4gIHN0cm9rZS13aWR0aDogMTA7XG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKXRyYW5zbGF0ZSgwcHgsIC04MHB4KTtcbiAgdHJhbnNpdGlvbjogc3Ryb2tlLWRhc2hvZmZzZXQgMXM7XG59XG5cbiMke25zfS1wZXJjZW50IHtcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZpbGw6ICNmZmZmZmY7XG59XG5cbiMke25zfS1wZXJjZW50LXZhbHVlIHtcbiAgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTtcbiAgdGV4dC1hbmNob3I6IG1pZGRsZTtcbn1cblxuIyR7bnN9LXBlcmNlbnQtc3VwZXIge1xuICBmaWxsOiAjYmRjM2M3O1xuICBmb250LXNpemU6IC40NWVtO1xuICBiYXNlbGluZS1zaGlmdDogMTAlO1xufVxuXG4uJHtuc30tbm9zZWxlY3Qge1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG5Aa2V5ZnJhbWVzICR7bnN9LWhpZGRlbi1kaXNwbGF5IHtcblx0MCUge1xuXHRcdG9wYWNpdHk6IDE7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgxKTtcblx0XHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XG5cdH1cblx0OTklIHtcblx0XHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcblx0XHRvcGFjaXR5OiAwO1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdFx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xuXHR9XG5cdDEwMCUge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0b3BhY2l0eTogMDtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDApO1xuXHRcdC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0fVxufVxuXG4uJHtuc30taGlkZGVuIHtcbiAgYW5pbWF0aW9uOiAke25zfS1oaWRkZW4tZGlzcGxheSAuM3M7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6Zm9yd2FyZHM7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuXG4uJHtuc30taGlkZGVuLW9ubG9hZCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5gO1xuXG5jb25zdCBodG1sID0gYFxuPHN2ZyBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1ub3NlbGVjdCAke25zfS1oaWRkZW4tb25sb2FkXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCI+XG4gIDxjaXJjbGUgaWQ9XCIke25zfS1iZ1wiIGN4PVwiNTAlXCIgY3k9XCI1MCVcIiByPVwiMzVcIj48L2NpcmNsZT5cbiAgPHBhdGggaWQ9XCIke25zfS1maWxsXCIgZD1cIk01LDQwYTM1LDM1IDAgMSwwIDcwLDBhMzUsMzUgMCAxLDAgLTcwLDBcIiAvPlxuICA8dGV4dCBpZD1cIiR7bnN9LXBlcmNlbnRcIiB4PVwiNTAlXCIgeT1cIjUxJVwiPjx0c3BhbiBpZD1cIiR7bnN9LXBlcmNlbnQtdmFsdWVcIj4wPC90c3Bhbj48dHNwYW4gaWQ9XCIke25zfS1wZXJjZW50LXN1cGVyXCI+JTwvdHNwYW4+PC90ZXh0PlxuPC9zdmc+XG5gO1xuXG5jb25zdCB1cGRhdGUgPSAocGVyY2VudCkgPT4ge1xuICBjb25zdCBtYXggPSAtMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBjb25zdCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1wZXJjZW50LXZhbHVlYCk7XG4gIGNvbnN0IHRyYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWZpbGxgKTtcbiAgY29uc3Qgb2Zmc2V0ID0gKCgxMDAgLSBwZXJjZW50KSAvIDEwMCkgKiBtYXg7XG5cbiAgdHJhY2suc2V0QXR0cmlidXRlKCdzdHlsZScsIGBzdHJva2UtZGFzaG9mZnNldDogJHtvZmZzZXR9YCk7XG4gIHZhbHVlLmlubmVySFRNTCA9IHBlcmNlbnQudG9TdHJpbmcoKTtcbn07XG5cbmNvbnN0IHJlc2V0ID0gKHN2ZykgPT4ge1xuICBzdmcuY2xhc3NMaXN0LmFkZChgJHtuc30taGlkZGVuYCk7XG4gIHNldFRpbWVvdXQoKCkgPT4gdXBkYXRlKDApLCAxZTMpO1xufTtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgaWYgKG9wdGlvbnMuZmlyc3RJbnN0YW5jZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICBhZGRDc3MoY3NzKTtcbiAgICAgIGFkZEh0bWwoaHRtbCk7XG4gICAgfSk7XG4gIH1cblxuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcblxuICAgIGlmIChhY3Rpb24gIT09ICdwcm9ncmVzcycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5mbG9vcihkYXRhLnBlcmNlbnQgKiAxMDApO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuXG4gICAgaWYgKCFzdmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB3ZSBjYW4gc2FmZWx5IGNhbGwgdGhpcyBldmVuIGlmIGl0IGRvZXNuJ3QgaGF2ZSB0aGUgY2xhc3NcbiAgICBzdmcuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30taGlkZGVuYCwgYCR7bnN9LWhpZGRlbi1vbmxvYWRgKTtcblxuICAgIGlmIChkYXRhLnBlcmNlbnQgPT09IDEpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzZXQoc3ZnKSwgNWUzKTtcbiAgICB9XG5cbiAgICB1cGRhdGUocGVyY2VudCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/overlays/progress.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/overlays/status.js":
/*!**************************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/overlays/status.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml, socketMessage } = __webpack_require__(/*! ./util */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-status';\nconst css = `\n@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');\n\n#${ns} {\n  background: #282d35;\n  border-radius: 0.6em;\n  display: flex;\n  flex-direction: column;\n\tfont-family: 'Open Sans', Helvetica, Arial, sans-serif;\n\tfont-size: 10px;\n  height: 90%;\n  min-height: 20em;\n  left: 50%;\n  opacity: 1;\n  overflow: hidden;\n  padding-bottom: 3em;\n  position: absolute;\n  top: 2rem;\n  transform: translateX(-50%);\n  transition: opacity .25s ease-in-out;\n  width: 95%;\n  z-index: 2147483645;\n}\n\n@keyframes ${ns}-hidden-display {\n\t0% {\n\t\topacity: 1;\n\t}\n\t99% {\n\t\tdisplay: inline-flex;\n\t\topacity: 0;\n\t}\n\t100% {\n\t\tdisplay: none;\n\t\topacity: 0;\n\t}\n}\n\n#${ns}.${ns}-hidden {\n  animation: ${ns}-hidden-display .3s;\n  animation-fill-mode:forwards;\n  display: none;\n}\n\n#${ns}.${ns}-min {\n  animation: minimize 10s;\n  bottom: 2em;\n  cursor: pointer;\n  height: 6em;\n  left: auto;\n  min-height: 6em;\n  padding-bottom: 0;\n  position: absolute;\n  right: 2em;\n  top: auto;\n  transform: none;\n  width: 6em;\n}\n\n#${ns}.${ns}-min #${ns}-beacon {\n  display: block;\n}\n\n#${ns}-title {\n  color: #fff;\n  font-size: 1.2em;\n  font-weight: normal;\n  margin: 0;\n  padding: 0.6em 0;\n  text-align: center;\n  width: 100%;\n}\n\n#${ns}.${ns}-min #${ns}-title {\n  display: none;\n}\n\n#${ns}-title-errors {\n  color: #ff5f58;\n  font-style: normal;\n  padding-left: 1em;\n}\n\n#${ns}-title-warnings {\n  color: #ffbd2e;\n  font-style: normal;\n  padding-left: 1em;\n}\n\n#${ns}-problems {\n  overflow-y: auto;\n  padding: 1em 2em;\n}\n\n#${ns}-problems pre {\n  color: #ddd;\n  background: #282d35;\n  display: block;\n  font-size: 1.3em;\n\tfont-family: 'Open Sans', Helvetica, Arial, sans-serif;\n  white-space: pre-wrap;\n}\n\n#${ns}-problems pre em {\n  background: #ff5f58;\n  border-radius: 0.3em;\n  color: #641e16;\n  font-style: normal;\n  line-height: 3em;\n  margin-right: 0.4em;\n  padding: 0.1em 0.4em;\n  text-transform: uppercase;\n}\n\npre#${ns}-warnings em {\n  background: #ffbd2e;\n  color: #3e2723;\n}\n\npre#${ns}-success {\n  display: none;\n  text-align: center;\n}\n\npre#${ns}-success em {\n  background: #7fb900;\n  color: #004d40;\n}\n\n#${ns}-problems.${ns}-success #${ns}-success {\n  display: block;\n}\n\n#${ns}.${ns}-min #${ns}-problems {\n  display: none;\n}\n\n#${ns}-nav {\n  opacity: 0.5;\n  padding: 1.2em;\n  position: absolute;\n}\n\n#${ns}.${ns}-min #${ns}-nav {\n  display: none;\n}\n\n#${ns}-nav:hover {\n  opacity: 1;\n}\n\n#${ns}-nav div {\n  background: #ff5f58;\n  border-radius: 1.2em;\n  cursor: pointer;\n  display: inline-block;\n  height: 1.2em;\n  position: relative;\n  width: 1.2em;\n}\n\ndiv#${ns}-min {\n  background: #ffbd2e;\n  margin-left: 0.8em;\n}\n\n#${ns}-beacon {\n  border-radius: 3em;\n  display: none;\n  font-size: 10px;\n  height: 3em;\n  margin: 1.6em auto;\n  position: relative;\n  width: 3em;\n}\n\n#${ns}-beacon:before, #${ns}-beacon:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(127,185,0, 0.2);\n  border-radius: 3em;\n  opacity: 0;\n}\n\n#${ns}-beacon:before {\n  animation: ${ns}-pulse 3s infinite linear;\n  transform: scale(1);\n}\n\n#${ns}-beacon:after {\n  animation: ${ns}-pulse 3s 2s infinite linear;\n}\n\n\n@keyframes ${ns}-pulse {\n  0% {\n    opacity: 0;\n    transform: scale(0.6);\n  }\n  33% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.4);\n  }\n}\n\n#${ns}-beacon mark {\n  background: rgba(127, 185, 0, 1);\n  border-radius: 100% 100%;\n  height: 1em;\n  left: 1em;\n  position: absolute;\n  top: 1em;\n  width: 1em;\n}\n\n#${ns}-beacon.${ns}-error mark {\n  background: #ff5f58;\n}\n\n#${ns}-beacon.${ns}-error:before, #${ns}-beacon.error:after {\n  background: rgba(255, 95, 88, 0.2);\n}\n\n#${ns}-beacon.${ns}-warning mark {\n  background: #ffbd2e;\n}\n\n#${ns}-beacon.${ns}-warning:before, #${ns}-beacon.warning:after {\n  background: rgba(255, 189, 46, 0.2);\n}\n`;\n\nconst html = `\n<aside id=\"${ns}\" class=\"${ns}-hidden\" title=\"build status\">\n  <figure id=\"${ns}-beacon\">\n    <mark/>\n  </figure>\n  <nav id=\"${ns}-nav\">\n    <div id=\"${ns}-close\" title=\"close\"></div>\n    <div id=\"${ns}-min\" title=\"minmize\"></div>\n  </nav>\n  <h1 id=\"${ns}-title\">\n    build status\n    <em id=\"${ns}-title-errors\"></em>\n    <em id=\"${ns}-title-warnings\"></em>\n  </h1>\n  <article id=\"${ns}-problems\">\n    <pre id=\"${ns}-success\"><em>Build Successful</em></pre>\n    <pre id=\"${ns}-errors\"></pre>\n    <pre id=\"${ns}-warnings\"></pre>\n  </article>\n</aside>\n`;\n\nconst init = (options, socket) => {\n  const hidden = `${ns}-hidden`;\n  let hasProblems = false;\n  let aside;\n  let beacon;\n  let problems;\n  let preErrors;\n  let preWarnings;\n  let titleErrors;\n  let titleWarnings;\n\n  const reset = () => {\n    preErrors.innerHTML = '';\n    preWarnings.innerHTML = '';\n    problems.classList.remove(`${ns}-success`);\n    beacon.className = '';\n    titleErrors.innerText = '';\n    titleWarnings.innerText = '';\n  };\n\n  const addErrors = (errors) => {\n    if (errors.length) {\n      problems.classList.remove(`${ns}-success`);\n      beacon.classList.add(`${ns}-error`);\n\n      for (const error of errors) {\n        const markup = `<div><em>Error</em> in ${error}</div>`;\n        addHtml(markup, preErrors);\n      }\n\n      titleErrors.innerText = `${errors.length} Error(s)`;\n    } else {\n      titleErrors.innerText = '';\n    }\n    aside.classList.remove(hidden);\n  };\n\n  const addWarnings = (warnings) => {\n    if (warnings.length) {\n      problems.classList.remove(`${ns}-success`);\n\n      if (!beacon.classList.contains(`${ns}-error`)) {\n        beacon.classList.add(`${ns}-warning`);\n      }\n\n      for (const warning of warnings) {\n        const markup = `<div><em>Warning</em> in ${warning}</div>`;\n        addHtml(markup, preWarnings);\n      }\n\n      titleWarnings.innerText = `${warnings.length} Warning(s)`;\n    } else {\n      titleWarnings.innerText = '';\n    }\n\n    aside.classList.remove(hidden);\n  };\n\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      [aside] = addHtml(html);\n      beacon = document.querySelector(`#${ns}-beacon`);\n      problems = document.querySelector(`#${ns}-problems`);\n      preErrors = document.querySelector(`#${ns}-errors`);\n      preWarnings = document.querySelector(`#${ns}-warnings`);\n      titleErrors = document.querySelector(`#${ns}-title-errors`);\n      titleWarnings = document.querySelector(`#${ns}-title-warnings`);\n\n      const close = document.querySelector(`#${ns}-close`);\n      const min = document.querySelector(`#${ns}-min`);\n\n      aside.addEventListener('click', () => {\n        aside.classList.remove(`${ns}-min`);\n      });\n\n      close.addEventListener('click', () => {\n        aside.classList.add(`${ns}-hidden`);\n      });\n\n      min.addEventListener('click', (e) => {\n        aside.classList.add(`${ns}-min`);\n        e.stopImmediatePropagation();\n      });\n    });\n  }\n\n  socketMessage(socket, (action, data) => {\n    if (!aside) {\n      return;\n    }\n\n    const { compilers } = window.webpackPluginServe;\n\n    switch (action) {\n      case 'build':\n        // clear errors and warnings when a new build begins\n        reset();\n        break;\n      case 'problems':\n        addErrors(data.errors);\n        addWarnings(data.warnings);\n        aside.classList.remove(hidden);\n        hasProblems = data.errors.length || data.warnings.length;\n        break;\n      case 'replace':\n        // if there's a compiler that isn't done yet, hold off and let it run the show\n        for (const compilerName of Object.keys(compilers)) {\n          if (!compilers[compilerName]) {\n            return;\n          }\n        }\n\n        if (hasProblems && !preErrors.children.length && !preWarnings.children.length) {\n          reset();\n          hasProblems = false;\n          problems.classList.add(`${ns}-success`);\n          aside.classList.remove(hidden);\n\n          setTimeout(() => aside.classList.add(hidden), 3e3);\n        }\n        break;\n      default:\n    }\n  });\n};\n\nmodule.exports = { init };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvc3RhdHVzLmpzP2Q4MzEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxpQ0FBaUMsR0FBRyxtQkFBTyxDQUFDLGdGQUFROztBQUUzRDtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ1osZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUc7QUFDdkI7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHO0FBQ3ZCO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLEdBQUc7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxHQUFHO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLE1BQU0sR0FBRztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRztBQUNwQztBQUNBOztBQUVBLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHO0FBQ3ZCO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUc7QUFDdkI7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxHQUFHO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLG1CQUFtQixHQUFHO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOLGVBQWUsR0FBRztBQUNsQjtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOLGVBQWUsR0FBRztBQUNsQjs7O0FBR0EsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLFVBQVUsR0FBRztBQUNuQjtBQUNBOztBQUVBLEdBQUcsR0FBRyxVQUFVLEdBQUcsa0JBQWtCLEdBQUc7QUFDeEM7QUFDQTs7QUFFQSxHQUFHLEdBQUcsVUFBVSxHQUFHO0FBQ25CO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLFVBQVUsR0FBRyxvQkFBb0IsR0FBRztBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLEdBQUcsV0FBVyxHQUFHO0FBQzlCLGdCQUFnQixHQUFHO0FBQ25CO0FBQ0E7QUFDQSxhQUFhLEdBQUc7QUFDaEIsZUFBZSxHQUFHO0FBQ2xCLGVBQWUsR0FBRztBQUNsQjtBQUNBLFlBQVksR0FBRztBQUNmO0FBQ0EsY0FBYyxHQUFHO0FBQ2pCLGNBQWMsR0FBRztBQUNqQjtBQUNBLGlCQUFpQixHQUFHO0FBQ3BCLGVBQWUsR0FBRztBQUNsQixlQUFlLEdBQUc7QUFDbEIsZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixHQUFHO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxHQUFHO0FBQ3RDLDhCQUE4QixHQUFHOztBQUVqQztBQUNBLGlEQUFpRCxNQUFNO0FBQ3ZEO0FBQ0E7O0FBRUEsaUNBQWlDLGNBQWM7QUFDL0MsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsR0FBRzs7QUFFdEMsd0NBQXdDLEdBQUc7QUFDM0MsZ0NBQWdDLEdBQUc7QUFDbkM7O0FBRUE7QUFDQSxtREFBbUQsUUFBUTtBQUMzRDtBQUNBOztBQUVBLG1DQUFtQyxnQkFBZ0I7QUFDbkQsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxHQUFHO0FBQzdDLDRDQUE0QyxHQUFHO0FBQy9DLDZDQUE2QyxHQUFHO0FBQ2hELCtDQUErQyxHQUFHO0FBQ2xELCtDQUErQyxHQUFHO0FBQ2xELGlEQUFpRCxHQUFHOztBQUVwRCwrQ0FBK0MsR0FBRztBQUNsRCw2Q0FBNkMsR0FBRzs7QUFFaEQ7QUFDQSxrQ0FBa0MsR0FBRztBQUNyQyxPQUFPOztBQUVQO0FBQ0EsK0JBQStCLEdBQUc7QUFDbEMsT0FBTzs7QUFFUDtBQUNBLCtCQUErQixHQUFHO0FBQ2xDO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLFlBQVk7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsR0FBRztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGtCQUFrQiIsImZpbGUiOiIuLi9ub2RlX21vZHVsZXMvd2VicGFjay1wbHVnaW4tc2VydmUvbGliL2NsaWVudC9vdmVybGF5cy9zdGF0dXMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwsIHNvY2tldE1lc3NhZ2UgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtc3RhdHVzJztcbmNvbnN0IGNzcyA9IGBcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zOjQwMCw3MDAnKTtcblxuIyR7bnN9IHtcbiAgYmFja2dyb3VuZDogIzI4MmQzNTtcbiAgYm9yZGVyLXJhZGl1czogMC42ZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiAxMHB4O1xuICBoZWlnaHQ6IDkwJTtcbiAgbWluLWhlaWdodDogMjBlbTtcbiAgbGVmdDogNTAlO1xuICBvcGFjaXR5OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nLWJvdHRvbTogM2VtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMnJlbTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XG4gIHdpZHRoOiA5NSU7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30taGlkZGVuLWRpc3BsYXkge1xuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHQ5OSUge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cblx0MTAwJSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG59XG5cbiMke25zfS4ke25zfS1oaWRkZW4ge1xuICBhbmltYXRpb246ICR7bnN9LWhpZGRlbi1kaXNwbGF5IC4zcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkcztcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiB7XG4gIGFuaW1hdGlvbjogbWluaW1pemUgMTBzO1xuICBib3R0b206IDJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDZlbTtcbiAgbGVmdDogYXV0bztcbiAgbWluLWhlaWdodDogNmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMmVtO1xuICB0b3A6IGF1dG87XG4gIHRyYW5zZm9ybTogbm9uZTtcbiAgd2lkdGg6IDZlbTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tYmVhY29uIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbiMke25zfS10aXRsZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDEuMmVtO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDAuNmVtIDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LXRpdGxlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LXRpdGxlLWVycm9ycyB7XG4gIGNvbG9yOiAjZmY1ZjU4O1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIHBhZGRpbmctbGVmdDogMWVtO1xufVxuXG4jJHtuc30tdGl0bGUtd2FybmluZ3Mge1xuICBjb2xvcjogI2ZmYmQyZTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBwYWRkaW5nLWxlZnQ6IDFlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMWVtIDJlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHByZSB7XG4gIGNvbG9yOiAjZGRkO1xuICBiYWNrZ3JvdW5kOiAjMjgyZDM1O1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxLjNlbTtcblx0Zm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbiMke25zfS1wcm9ibGVtcyBwcmUgZW0ge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcbiAgY29sb3I6ICM2NDFlMTY7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDNlbTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjRlbTtcbiAgcGFkZGluZzogMC4xZW0gMC40ZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbnByZSMke25zfS13YXJuaW5ncyBlbSB7XG4gIGJhY2tncm91bmQ6ICNmZmJkMmU7XG4gIGNvbG9yOiAjM2UyNzIzO1xufVxuXG5wcmUjJHtuc30tc3VjY2VzcyB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucHJlIyR7bnN9LXN1Y2Nlc3MgZW0ge1xuICBiYWNrZ3JvdW5kOiAjN2ZiOTAwO1xuICBjb2xvcjogIzAwNGQ0MDtcbn1cblxuIyR7bnN9LXByb2JsZW1zLiR7bnN9LXN1Y2Nlc3MgIyR7bnN9LXN1Y2Nlc3Mge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tcHJvYmxlbXMge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2IHtcbiAgb3BhY2l0eTogMC41O1xuICBwYWRkaW5nOiAxLjJlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS1uYXYge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2OmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuIyR7bnN9LW5hdiBkaXYge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAxLjJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogMS4yZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEuMmVtO1xufVxuXG5kaXYjJHtuc30tbWluIHtcbiAgYmFja2dyb3VuZDogI2ZmYmQyZTtcbiAgbWFyZ2luLWxlZnQ6IDAuOGVtO1xufVxuXG4jJHtuc30tYmVhY29uIHtcbiAgYm9yZGVyLXJhZGl1czogM2VtO1xuICBkaXNwbGF5OiBub25lO1xuICBmb250LXNpemU6IDEwcHg7XG4gIGhlaWdodDogM2VtO1xuICBtYXJnaW46IDEuNmVtIGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDNlbTtcbn1cblxuIyR7bnN9LWJlYWNvbjpiZWZvcmUsICMke25zfS1iZWFjb246YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LDE4NSwwLCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiAzZW07XG4gIG9wYWNpdHk6IDA7XG59XG5cbiMke25zfS1iZWFjb246YmVmb3JlIHtcbiAgYW5pbWF0aW9uOiAke25zfS1wdWxzZSAzcyBpbmZpbml0ZSBsaW5lYXI7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG5cbiMke25zfS1iZWFjb246YWZ0ZXIge1xuICBhbmltYXRpb246ICR7bnN9LXB1bHNlIDNzIDJzIGluZmluaXRlIGxpbmVhcjtcbn1cblxuXG5Aa2V5ZnJhbWVzICR7bnN9LXB1bHNlIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjYpO1xuICB9XG4gIDMzJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICB9XG59XG5cbiMke25zfS1iZWFjb24gbWFyayB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LCAxODUsIDAsIDEpO1xuICBib3JkZXItcmFkaXVzOiAxMDAlIDEwMCU7XG4gIGhlaWdodDogMWVtO1xuICBsZWZ0OiAxZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxZW07XG4gIHdpZHRoOiAxZW07XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3IgbWFyayB7XG4gIGJhY2tncm91bmQ6ICNmZjVmNTg7XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3I6YmVmb3JlLCAjJHtuc30tYmVhY29uLmVycm9yOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDk1LCA4OCwgMC4yKTtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS13YXJuaW5nIG1hcmsge1xuICBiYWNrZ3JvdW5kOiAjZmZiZDJlO1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LXdhcm5pbmc6YmVmb3JlLCAjJHtuc30tYmVhY29uLndhcm5pbmc6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTg5LCA0NiwgMC4yKTtcbn1cbmA7XG5cbmNvbnN0IGh0bWwgPSBgXG48YXNpZGUgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30taGlkZGVuXCIgdGl0bGU9XCJidWlsZCBzdGF0dXNcIj5cbiAgPGZpZ3VyZSBpZD1cIiR7bnN9LWJlYWNvblwiPlxuICAgIDxtYXJrLz5cbiAgPC9maWd1cmU+XG4gIDxuYXYgaWQ9XCIke25zfS1uYXZcIj5cbiAgICA8ZGl2IGlkPVwiJHtuc30tY2xvc2VcIiB0aXRsZT1cImNsb3NlXCI+PC9kaXY+XG4gICAgPGRpdiBpZD1cIiR7bnN9LW1pblwiIHRpdGxlPVwibWlubWl6ZVwiPjwvZGl2PlxuICA8L25hdj5cbiAgPGgxIGlkPVwiJHtuc30tdGl0bGVcIj5cbiAgICBidWlsZCBzdGF0dXNcbiAgICA8ZW0gaWQ9XCIke25zfS10aXRsZS1lcnJvcnNcIj48L2VtPlxuICAgIDxlbSBpZD1cIiR7bnN9LXRpdGxlLXdhcm5pbmdzXCI+PC9lbT5cbiAgPC9oMT5cbiAgPGFydGljbGUgaWQ9XCIke25zfS1wcm9ibGVtc1wiPlxuICAgIDxwcmUgaWQ9XCIke25zfS1zdWNjZXNzXCI+PGVtPkJ1aWxkIFN1Y2Nlc3NmdWw8L2VtPjwvcHJlPlxuICAgIDxwcmUgaWQ9XCIke25zfS1lcnJvcnNcIj48L3ByZT5cbiAgICA8cHJlIGlkPVwiJHtuc30td2FybmluZ3NcIj48L3ByZT5cbiAgPC9hcnRpY2xlPlxuPC9hc2lkZT5cbmA7XG5cbmNvbnN0IGluaXQgPSAob3B0aW9ucywgc29ja2V0KSA9PiB7XG4gIGNvbnN0IGhpZGRlbiA9IGAke25zfS1oaWRkZW5gO1xuICBsZXQgaGFzUHJvYmxlbXMgPSBmYWxzZTtcbiAgbGV0IGFzaWRlO1xuICBsZXQgYmVhY29uO1xuICBsZXQgcHJvYmxlbXM7XG4gIGxldCBwcmVFcnJvcnM7XG4gIGxldCBwcmVXYXJuaW5ncztcbiAgbGV0IHRpdGxlRXJyb3JzO1xuICBsZXQgdGl0bGVXYXJuaW5ncztcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBwcmVFcnJvcnMuaW5uZXJIVE1MID0gJyc7XG4gICAgcHJlV2FybmluZ3MuaW5uZXJIVE1MID0gJyc7XG4gICAgcHJvYmxlbXMuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tc3VjY2Vzc2ApO1xuICAgIGJlYWNvbi5jbGFzc05hbWUgPSAnJztcbiAgICB0aXRsZUVycm9ycy5pbm5lclRleHQgPSAnJztcbiAgICB0aXRsZVdhcm5pbmdzLmlubmVyVGV4dCA9ICcnO1xuICB9O1xuXG4gIGNvbnN0IGFkZEVycm9ycyA9IChlcnJvcnMpID0+IHtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcHJvYmxlbXMuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tc3VjY2Vzc2ApO1xuICAgICAgYmVhY29uLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWVycm9yYCk7XG5cbiAgICAgIGZvciAoY29uc3QgZXJyb3Igb2YgZXJyb3JzKSB7XG4gICAgICAgIGNvbnN0IG1hcmt1cCA9IGA8ZGl2PjxlbT5FcnJvcjwvZW0+IGluICR7ZXJyb3J9PC9kaXY+YDtcbiAgICAgICAgYWRkSHRtbChtYXJrdXAsIHByZUVycm9ycyk7XG4gICAgICB9XG5cbiAgICAgIHRpdGxlRXJyb3JzLmlubmVyVGV4dCA9IGAke2Vycm9ycy5sZW5ndGh9IEVycm9yKHMpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGVFcnJvcnMuaW5uZXJUZXh0ID0gJyc7XG4gICAgfVxuICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcbiAgfTtcblxuICBjb25zdCBhZGRXYXJuaW5ncyA9ICh3YXJuaW5ncykgPT4ge1xuICAgIGlmICh3YXJuaW5ncy5sZW5ndGgpIHtcbiAgICAgIHByb2JsZW1zLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LXN1Y2Nlc3NgKTtcblxuICAgICAgaWYgKCFiZWFjb24uY2xhc3NMaXN0LmNvbnRhaW5zKGAke25zfS1lcnJvcmApKSB7XG4gICAgICAgIGJlYWNvbi5jbGFzc0xpc3QuYWRkKGAke25zfS13YXJuaW5nYCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgd2FybmluZyBvZiB3YXJuaW5ncykge1xuICAgICAgICBjb25zdCBtYXJrdXAgPSBgPGRpdj48ZW0+V2FybmluZzwvZW0+IGluICR7d2FybmluZ308L2Rpdj5gO1xuICAgICAgICBhZGRIdG1sKG1hcmt1cCwgcHJlV2FybmluZ3MpO1xuICAgICAgfVxuXG4gICAgICB0aXRsZVdhcm5pbmdzLmlubmVyVGV4dCA9IGAke3dhcm5pbmdzLmxlbmd0aH0gV2FybmluZyhzKWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlV2FybmluZ3MuaW5uZXJUZXh0ID0gJyc7XG4gICAgfVxuXG4gICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICB9O1xuXG4gIGlmIChvcHRpb25zLmZpcnN0SW5zdGFuY2UpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgYWRkQ3NzKGNzcyk7XG4gICAgICBbYXNpZGVdID0gYWRkSHRtbChodG1sKTtcbiAgICAgIGJlYWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1iZWFjb25gKTtcbiAgICAgIHByb2JsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXByb2JsZW1zYCk7XG4gICAgICBwcmVFcnJvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tZXJyb3JzYCk7XG4gICAgICBwcmVXYXJuaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS13YXJuaW5nc2ApO1xuICAgICAgdGl0bGVFcnJvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tdGl0bGUtZXJyb3JzYCk7XG4gICAgICB0aXRsZVdhcm5pbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXRpdGxlLXdhcm5pbmdzYCk7XG5cbiAgICAgIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWNsb3NlYCk7XG4gICAgICBjb25zdCBtaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tbWluYCk7XG5cbiAgICAgIGFzaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1taW5gKTtcbiAgICAgIH0pO1xuXG4gICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LmFkZChgJHtuc30taGlkZGVuYCk7XG4gICAgICB9KTtcblxuICAgICAgbWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LmFkZChgJHtuc30tbWluYCk7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvY2tldE1lc3NhZ2Uoc29ja2V0LCAoYWN0aW9uLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFhc2lkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29tcGlsZXJzIH0gPSB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2J1aWxkJzpcbiAgICAgICAgLy8gY2xlYXIgZXJyb3JzIGFuZCB3YXJuaW5ncyB3aGVuIGEgbmV3IGJ1aWxkIGJlZ2luc1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Byb2JsZW1zJzpcbiAgICAgICAgYWRkRXJyb3JzKGRhdGEuZXJyb3JzKTtcbiAgICAgICAgYWRkV2FybmluZ3MoZGF0YS53YXJuaW5ncyk7XG4gICAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcbiAgICAgICAgaGFzUHJvYmxlbXMgPSBkYXRhLmVycm9ycy5sZW5ndGggfHwgZGF0YS53YXJuaW5ncy5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYSBjb21waWxlciB0aGF0IGlzbid0IGRvbmUgeWV0LCBob2xkIG9mZiBhbmQgbGV0IGl0IHJ1biB0aGUgc2hvd1xuICAgICAgICBmb3IgKGNvbnN0IGNvbXBpbGVyTmFtZSBvZiBPYmplY3Qua2V5cyhjb21waWxlcnMpKSB7XG4gICAgICAgICAgaWYgKCFjb21waWxlcnNbY29tcGlsZXJOYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNQcm9ibGVtcyAmJiAhcHJlRXJyb3JzLmNoaWxkcmVuLmxlbmd0aCAmJiAhcHJlV2FybmluZ3MuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICBoYXNQcm9ibGVtcyA9IGZhbHNlO1xuICAgICAgICAgIHByb2JsZW1zLmNsYXNzTGlzdC5hZGQoYCR7bnN9LXN1Y2Nlc3NgKTtcbiAgICAgICAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGFzaWRlLmNsYXNzTGlzdC5hZGQoaGlkZGVuKSwgM2UzKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/overlays/status.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/overlays/util.js":
/*!************************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/overlays/util.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst addHtml = (html, parent) => {\n  const div = document.createElement('div');\n  const nodes = [];\n\n  div.innerHTML = html.trim();\n\n  while (div.firstChild) {\n    nodes.push((parent || document.body).appendChild(div.firstChild));\n  }\n\n  return nodes;\n};\n\nconst addCss = (css) => {\n  const style = document.createElement('style');\n\n  style.type = 'text/css';\n\n  if (css.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    style.appendChild(document.createTextNode(css));\n  }\n\n  // append the stylesheet for the svg\n  document.head.appendChild(style);\n};\n\nconst socketMessage = (socket, handler) => {\n  socket.addEventListener('message', (message) => {\n    const { action, data = {} } = JSON.parse(message.data);\n    handler(action, data);\n  });\n};\n\nmodule.exports = { addCss, addHtml, socketMessage };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvdXRpbC5qcz84ZmJjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsa0JBQWtCLEVBQUU7QUFDL0I7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCIiwiZmlsZSI6Ii4uL25vZGVfbW9kdWxlcy93ZWJwYWNrLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50L292ZXJsYXlzL3V0aWwuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgYWRkSHRtbCA9IChodG1sLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IG5vZGVzID0gW107XG5cbiAgZGl2LmlubmVySFRNTCA9IGh0bWwudHJpbSgpO1xuXG4gIHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuICAgIG5vZGVzLnB1c2goKHBhcmVudCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChkaXYuZmlyc3RDaGlsZCkpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGVzO1xufTtcblxuY29uc3QgYWRkQ3NzID0gKGNzcykgPT4ge1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKGNzcy5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG5cbiAgLy8gYXBwZW5kIHRoZSBzdHlsZXNoZWV0IGZvciB0aGUgc3ZnXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufTtcblxuY29uc3Qgc29ja2V0TWVzc2FnZSA9IChzb2NrZXQsIGhhbmRsZXIpID0+IHtcbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhID0ge30gfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBoYW5kbGVyKGFjdGlvbiwgZGF0YSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGFkZENzcywgYWRkSHRtbCwgc29ja2V0TWVzc2FnZSB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/overlays/util.js\n");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/style.scss */ \"./sass/style.scss\");\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcz9lZTFjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiIuL2pzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zYXNzL3N0eWxlLnNjc3MnXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/index.js\n");

/***/ }),

/***/ "./sass/style.scss":
/*!*************************!*\
  !*** ./sass/style.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zYXNzL3N0eWxlLnNjc3M/MGEyZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIuL3Nhc3Mvc3R5bGUuc2Nzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./sass/style.scss\n");

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./js/index.js webpack-plugin-serve/client ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./js/index.js */"./js/index.js");
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"../node_modules/webpack-plugin-serve/client.js");


/***/ })

/******/ });